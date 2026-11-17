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

    // Retrieve up to 25 queued messages
    const queuedLogs = await prisma.communicationLog.findMany({
      where: {
        tenantId: tenant.id,
        status: 'QUEUED',
      },
      take: 25,
      orderBy: { createdAt: 'asc' },
    });

    if (queuedLogs.length === 0) {
      return NextResponse.json({ success: true, message: 'Communication queue is clean. 0 pending dispatches.', processed: 0 });
    }

    const processedIds: string[] = [];

    // Simulate/Execute Meta Cloud API payload dispatch
    for (const log of queuedLogs) {
      // In production with META_WHATSAPP_TOKEN, this fires the HTTP POST to graph.facebook.com
      // For now, mark as SENT with timestamped metadata
      await prisma.communicationLog.update({
        where: { id: log.id },
        data: {
          status: 'SENT',
          metadata: {
            ...(typeof log.metadata === 'object' && log.metadata !== null ? log.metadata : {}),
            dispatchedAt: new Date().toISOString(),
            gateway: 'Meta WhatsApp Cloud API (Simulated)',
          },
        },
      });

      processedIds.push(log.id);
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processedIds.length} queued WhatsApp messages.`,
      processedCount: processedIds.length,
      processedIds,
    });
  } catch (error: any) {
    console.error('Queue dispatch error:', error);
    return NextResponse.json({ success: false, message: 'Queue processor failed' }, { status: 500 });
  }
}
