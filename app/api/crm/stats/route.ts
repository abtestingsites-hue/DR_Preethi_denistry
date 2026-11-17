import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant not found' }, { status: 404 });
    }

    const [totalLeads, newLeads, totalAppointments, pendingAppointments, totalPatients] =
      await Promise.all([
        prisma.lead.count({ where: { tenantId: tenant.id } }),
        prisma.lead.count({ where: { tenantId: tenant.id, status: 'NEW' } }),
        prisma.appointment.count({ where: { tenantId: tenant.id } }),
        prisma.appointment.count({ where: { tenantId: tenant.id, status: 'PENDING' } }),
        prisma.patient.count({ where: { tenantId: tenant.id } }),
      ]);

    const recentAuditLogs = await prisma.auditLog.findMany({
      where: { tenantId: tenant.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        totalAppointments,
        pendingAppointments,
        totalPatients,
      },
      auditLogs: recentAuditLogs,
    });
  } catch (error: any) {
    console.error('Fetch CRM stats error:', error);
    return NextResponse.json({ success: false, message: 'Failed to calculate CRM metrics' }, { status: 500 });
  }
}
