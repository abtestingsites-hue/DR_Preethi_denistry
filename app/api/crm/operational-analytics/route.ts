import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant not found' }, { status: 404 });
    }

    // 1. Calculate Receptionist Lead Response Time (Average SLA in Minutes)
    const contactedLeads = await prisma.lead.findMany({
      where: {
        tenantId: tenant.id,
        status: { in: ['CONTACTED', 'QUALIFIED', 'CONSULTATION_BOOKED'] },
      },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    let avgResponseMinutes = 12; // Baseline SLA default
    if (contactedLeads.length > 0) {
      const totalMinutes = contactedLeads.reduce((acc, curr) => {
        const diffMs = new Date(curr.updatedAt).getTime() - new Date(curr.createdAt).getTime();
        const mins = Math.max(1, Math.round(diffMs / 60000));
        return acc + mins;
      }, 0);
      avgResponseMinutes = Math.round(totalMinutes / contactedLeads.length);
    }

    // 2. Identify Missed / Neglected Leads (> 2 hours uncontacted)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const missedLeads = await prisma.lead.count({
      where: {
        tenantId: tenant.id,
        status: 'NEW',
        createdAt: { lte: twoHoursAgo },
      },
    });

    // 3. Operational Chair / Appointment Utilization
    const [totalAppointments, completedAppointments, noShowAppointments, cancelledAppointments] =
      await Promise.all([
        prisma.appointment.count({ where: { tenantId: tenant.id } }),
        prisma.appointment.count({ where: { tenantId: tenant.id, status: 'COMPLETED' } }),
        prisma.appointment.count({ where: { tenantId: tenant.id, status: 'NO_SHOW' } }),
        prisma.appointment.count({ where: { tenantId: tenant.id, status: 'CANCELLED' } }),
      ]);

    const attendanceRate =
      totalAppointments > 0
        ? Math.round((completedAppointments / totalAppointments) * 100)
        : 100;

    // 4. Communication Dispatch Queue Health
    const [queuedMessages, sentMessages, failedMessages] = await Promise.all([
      prisma.communicationLog.count({ where: { tenantId: tenant.id, status: 'QUEUED' } }),
      prisma.communicationLog.count({ where: { tenantId: tenant.id, status: 'SENT' } }),
      prisma.communicationLog.count({ where: { tenantId: tenant.id, status: 'FAILED' } }),
    ]);

    return NextResponse.json({
      success: true,
      operational: {
        avgResponseMinutes,
        missedLeadsCount: missedLeads,
        totalAppointments,
        completedAppointments,
        noShowAppointments,
        cancelledAppointments,
        attendanceRate,
      },
      queueHealth: {
        queuedMessages,
        sentMessages,
        failedMessages,
        gatewayStatus: process.env.META_WHATSAPP_TOKEN ? 'LIVE_META_CLOUD' : 'SIMULATED_LOCAL',
      },
    });
  } catch (error: any) {
    console.error('Operational analytics error:', error);
    return NextResponse.json({ success: false, message: 'Failed to compute operational metrics' }, { status: 500 });
  }
}
