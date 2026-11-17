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

    // 1. Leads by Acquisition Source (Marketing BI)
    const leadsBySource = await prisma.lead.groupBy({
      by: ['source'],
      where: { tenantId: tenant.id },
      _count: { id: true },
    });

    // 2. Leads by Treatment Category (Clinical Demand BI)
    const leadsByTreatment = await prisma.lead.groupBy({
      by: ['treatmentSlug'],
      where: { tenantId: tenant.id },
      _count: { id: true },
    });

    // 3. Conversion Funnel (Lifecycle Pipeline BI)
    const [totalLeads, contactedLeads, qualifiedLeads, bookedLeads, completedAppts] =
      await Promise.all([
        prisma.lead.count({ where: { tenantId: tenant.id } }),
        prisma.lead.count({
          where: { tenantId: tenant.id, status: { in: ['CONTACTED', 'QUALIFIED', 'CONSULTATION_BOOKED'] } },
        }),
        prisma.lead.count({
          where: { tenantId: tenant.id, status: { in: ['QUALIFIED', 'CONSULTATION_BOOKED'] } },
        }),
        prisma.lead.count({
          where: { tenantId: tenant.id, status: 'CONSULTATION_BOOKED' },
        }),
        prisma.appointment.count({
          where: { tenantId: tenant.id, status: 'COMPLETED' },
        }),
      ]);

    // 4. Communication Dispatch Performance
    const commBreakdown = await prisma.communicationLog.groupBy({
      by: ['status', 'channel'],
      where: { tenantId: tenant.id },
      _count: { id: true },
    });

    return NextResponse.json({
      success: true,
      analytics: {
        marketing: {
          leadsBySource: leadsBySource.map((s) => ({ source: s.source, count: s._count.id })),
          leadsByTreatment: leadsByTreatment.map((t) => ({ treatment: t.treatmentSlug, count: t._count.id })),
        },
        funnel: {
          impressionsToInquiry: totalLeads,
          inquiryToContacted: contactedLeads,
          contactedToQualified: qualifiedLeads,
          qualifiedToBooked: bookedLeads,
          bookedToCompleted: completedAppts,
        },
        communications: commBreakdown.map((c) => ({
          channel: c.channel,
          status: c.status,
          count: c._count.id,
        })),
      },
    });
  } catch (error: any) {
    console.error('Analytics BI computation error:', error);
    return NextResponse.json({ success: false, message: 'Failed to compute BI metrics' }, { status: 500 });
  }
}
