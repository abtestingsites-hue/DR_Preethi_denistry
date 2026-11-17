import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Verification endpoint for Meta Cloud API Webhook subscription
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.META_WHATSAPP_VERIFY_TOKEN || 'artibots_preethis_dentistry_webhook_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('Meta WhatsApp Webhook subscription verified successfully.');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification token mismatch' }, { status: 403 });
}

// Inbound message & delivery status ingestion from Meta Cloud API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Process WhatsApp inbound payloads
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // 1. Inbound Patient Message Ingestion
    if (value?.messages && value.messages.length > 0) {
      const msg = value.messages[0];
      const from = msg.from; // Phone number with country code (e.g. 919876543210)
      const text = msg.text?.body || '[Media/Interactive Message]';

      await prisma.communicationLog.create({
        data: {
          tenantId: tenant.id,
          recipientPhone: `+${from}`,
          channel: 'WHATSAPP',
          direction: 'INBOUND',
          messageBody: text,
          status: 'DELIVERED',
          metadata: msg,
        },
      });

      // Auto-create or update lead
      const existingLead = await prisma.lead.findFirst({
        where: {
          tenantId: tenant.id,
          phoneNumber: { contains: from.slice(-10) },
        },
      });

      if (!existingLead) {
        await prisma.lead.create({
          data: {
            tenantId: tenant.id,
            fullName: value.contacts?.[0]?.profile?.name || `WhatsApp Patient (${from.slice(-4)})`,
            phoneNumber: `+${from}`,
            treatmentSlug: 'invisalign-clear-aligners',
            source: 'WHATSAPP',
            status: 'NEW',
            notes: text,
          },
        });
      }
    }

    // 2. Message Delivery Status Receipts
    if (value?.statuses && value.statuses.length > 0) {
      const statusObj = value.statuses[0];
      const recipientId = statusObj.recipient_id;
      const metaStatus = statusObj.status; // sent, delivered, read, failed

      let appStatus: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' = 'SENT';
      if (metaStatus === 'delivered') appStatus = 'DELIVERED';
      if (metaStatus === 'read') appStatus = 'READ';
      if (metaStatus === 'failed') appStatus = 'FAILED';

      const lastComm = await prisma.communicationLog.findFirst({
        where: {
          tenantId: tenant.id,
          recipientPhone: { contains: recipientId.slice(-10) },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (lastComm) {
        await prisma.communicationLog.update({
          where: { id: lastComm.id },
          data: { status: appStatus },
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('WhatsApp webhook processing error:', error);
    return NextResponse.json({ success: false }, { status: 200 }); // Always 200 to acknowledge Meta webhook
  }
}
