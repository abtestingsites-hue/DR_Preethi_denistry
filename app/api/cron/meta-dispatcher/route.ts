import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant clinic not configured' }, { status: 404 });
    }

    const token = process.env.META_WHATSAPP_TOKEN;
    const phoneId = process.env.META_WHATSAPP_PHONE_ID;

    // Fetch queued messages
    const queuedLogs = await prisma.communicationLog.findMany({
      where: {
        tenantId: tenant.id,
        status: 'QUEUED',
      },
      take: 20,
      orderBy: { createdAt: 'asc' },
    });

    if (queuedLogs.length === 0) {
      return NextResponse.json({ success: true, message: 'Queue is clear. No pending dispatches.', dispatchedCount: 0 });
    }

    let successCount = 0;
    let failCount = 0;

    for (const log of queuedLogs) {
      // Clean recipient phone (strip non-digits)
      const cleanPhone = log.recipientPhone.replace(/[^0-9]/g, '');

      if (token && phoneId) {
        // Live Meta Cloud API HTTP Dispatch
        try {
          const metaRes = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: cleanPhone,
              type: 'text',
              text: { body: log.messageBody },
            }),
          });

          const metaData = await metaRes.json();

          if (metaRes.ok) {
            await prisma.communicationLog.update({
              where: { id: log.id },
              data: {
                status: 'SENT',
                metadata: {
                  ...(typeof log.metadata === 'object' && log.metadata !== null ? log.metadata : {}),
                  metaMessageId: metaData.messages?.[0]?.id,
                  dispatchedAt: new Date().toISOString(),
                  mode: 'LIVE_META_CLOUD',
                },
              },
            });
            successCount++;
          } else {
            await prisma.communicationLog.update({
              where: { id: log.id },
              data: {
                status: 'FAILED',
                metadata: {
                  ...(typeof log.metadata === 'object' && log.metadata !== null ? log.metadata : {}),
                  error: metaData,
                  attemptedAt: new Date().toISOString(),
                },
              },
            });
            failCount++;
          }
        } catch (fetchErr) {
          failCount++;
        }
      } else {
        // High-fidelity fallback / Local development simulated dispatch
        await prisma.communicationLog.update({
          where: { id: log.id },
          data: {
            status: 'SENT',
            metadata: {
              ...(typeof log.metadata === 'object' && log.metadata !== null ? log.metadata : {}),
              dispatchedAt: new Date().toISOString(),
              mode: 'SIMULATED_LOCAL',
            },
          },
        });
        successCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${queuedLogs.length} messages: ${successCount} sent, ${failCount} failed.`,
      dispatchedCount: successCount,
      failedCount: failCount,
      mode: token && phoneId ? 'LIVE_META_CLOUD' : 'SIMULATED_LOCAL',
    });
  } catch (error: any) {
    console.error('Queue runner error:', error);
    return NextResponse.json({ success: false, message: 'Queue runner error' }, { status: 500 });
  }
}
