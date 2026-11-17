import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant not found' }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { tenantId: tenant.id },
      include: {
        patient: true,
        dentist: {
          select: { id: true, fullName: true, role: true },
        },
      },
      orderBy: { scheduledStart: 'desc' },
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    console.error('Fetch appointments error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, status, notes } = body;

    if (!appointmentId) {
      return NextResponse.json({ success: false, message: 'Appointment ID required' }, { status: 400 });
    }

    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        ...(status ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        tenantId: updated.tenantId,
        action: 'APPOINTMENT_STATUS_MUTATED',
        entityType: 'APPOINTMENT',
        entityId: updated.id,
        changes: { status, notes },
      },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error: any) {
    console.error('Update appointment error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update appointment' }, { status: 500 });
  }
}
