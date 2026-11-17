import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant not found' }, { status: 404 });
    }

    // 1. Find all appointments scheduled for tomorrow with PENDING or CONFIRMED status
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        tenantId: tenant.id,
        scheduledStart: {
          gte: startOfTomorrow,
          lte: endOfTomorrow,
        },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      include: {
        patient: true,
      },
    });

    let dispatchedCount = 0;

    for (const appt of upcomingAppointments) {
      const formattedTime = new Date(appt.scheduledStart).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const messageBody = `Vanakkam ${appt.patient.fullName}, this is a reminder from Dr. Preethi's Dentistry for your ${appt.treatmentType} consultation tomorrow at ${formattedTime} (Saibaba Colony, Coimbatore). Please reply YES to confirm or CALL +91 78128 71829 to reschedule.`;

      // Log communication record
      await prisma.communicationLog.create({
        data: {
          tenantId: tenant.id,
          appointmentId: appt.id,
          recipientPhone: appt.patient.phoneNumber,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          templateName: 'appointment_reminder_24h',
          messageBody,
          status: 'SENT',
        },
      });

      dispatchedCount++;
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        action: 'DISPATCH_AUTOMATED_REMINDERS',
        entityType: 'COMMUNICATION',
        entityId: 'SYSTEM_CRON',
        changes: { dispatchedCount, date: startOfTomorrow.toISOString() },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Automated reminder job completed. Dispatched ${dispatchedCount} reminders.`,
      dispatchedCount,
    });
  } catch (error: any) {
    console.error('Reminder dispatch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to dispatch reminders' }, { status: 500 });
  }
}
