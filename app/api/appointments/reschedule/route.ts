import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyStaffToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const { appointmentId, newDate, newTimeSlot, cancellationReason, action } = body;

    if (!appointmentId || !action) {
      return NextResponse.json(
        { success: false, message: 'Appointment ID and action (RESCHEDULE | CANCEL) are required' },
        { status: 400 }
      );
    }

    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true, tenant: true },
    });

    if (!appt) {
      return NextResponse.json({ success: false, message: 'Appointment record not found' }, { status: 404 });
    }

    if (action === 'CANCEL') {
      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          status: 'CANCELLED',
          cancellationReason: cancellationReason || 'Cancelled upon patient request',
        },
      });

      // 1. Audit Log
      await prisma.auditLog.create({
        data: {
          tenantId: appt.tenantId,
          userId: session?.userId || null,
          action: 'APPOINTMENT_CANCELLED',
          entityType: 'APPOINTMENT',
          entityId: appt.id,
          changes: {
            previousDate: appt.scheduledStart,
            reason: cancellationReason,
            cancelledBy: session?.fullName || 'Patient Portal',
          },
        },
      });

      // 2. WhatsApp Notification
      const whatsappText = `*Dr. Preethi's Dentistry — Appointment Cancellation Notice*\n` +
        `Patient: ${appt.patient.fullName} (${appt.patient.medicalRecordNumber})\n` +
        `Treatment: ${appt.treatmentType}\n` +
        `Status: CANCELLED\n` +
        `Reason: ${cancellationReason || 'Patient request'}\n\n` +
        `If you would like to book a new appointment, call our Saibaba Colony reception: +91 78128 71829.`;

      await prisma.communicationLog.create({
        data: {
          tenantId: appt.tenantId,
          appointmentId: appt.id,
          recipientPhone: appt.patient.phoneNumber,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          templateName: 'appointment_cancellation_ack',
          messageBody: whatsappText,
          status: 'QUEUED',
        },
      });

      return NextResponse.json({ success: true, message: 'Appointment cancelled successfully.', appointment: updated });
    }

    if (action === 'RESCHEDULE') {
      if (!newDate || !newTimeSlot) {
        return NextResponse.json(
          { success: false, message: 'New date and time slot are required for rescheduling' },
          { status: 400 }
        );
      }

      const newStart = new Date(`${newDate}T${newTimeSlot}:00.000Z`);
      const newEnd = new Date(newStart.getTime() + 30 * 60000);

      // Check for slot collisions
      const collision = await prisma.appointment.findFirst({
        where: {
          tenantId: appt.tenantId,
          scheduledStart: newStart,
          status: { in: ['PENDING', 'CONFIRMED'] },
          id: { not: appointmentId },
        },
      });

      if (collision) {
        return NextResponse.json(
          { success: false, message: 'Selected time slot is already booked. Please choose another slot.' },
          { status: 409 }
        );
      }

      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          scheduledStart: newStart,
          scheduledEnd: newEnd,
          status: 'RESCHEDULED',
        },
      });

      // 1. Audit Log
      await prisma.auditLog.create({
        data: {
          tenantId: appt.tenantId,
          userId: session?.userId || null,
          action: 'APPOINTMENT_RESCHEDULED',
          entityType: 'APPOINTMENT',
          entityId: appt.id,
          changes: {
            previousDate: appt.scheduledStart,
            newDate: newStart,
            rescheduledBy: session?.fullName || 'Patient Portal',
          },
        },
      });

      // 2. WhatsApp Notification
      const formattedDate = newStart.toLocaleDateString('en-IN', { dateStyle: 'full' });
      const whatsappText = `*Dr. Preethi's Dentistry — Rescheduled Consultation*\n` +
        `Patient: ${appt.patient.fullName} (${appt.patient.medicalRecordNumber})\n` +
        `Treatment: ${appt.treatmentType}\n` +
        `*New Consultation Slot:* ${formattedDate} at ${newTimeSlot}\n` +
        `Doctor: Dr. Preethi Subramanian, MDS\n\n` +
        `Saibaba Colony Clinic Desk: +91 78128 71829`;

      await prisma.communicationLog.create({
        data: {
          tenantId: appt.tenantId,
          appointmentId: appt.id,
          recipientPhone: appt.patient.phoneNumber,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          templateName: 'appointment_rescheduled_ack',
          messageBody: whatsappText,
          status: 'QUEUED',
        },
      });

      return NextResponse.json({ success: true, message: 'Appointment rescheduled successfully.', appointment: updated });
    }

    return NextResponse.json({ success: false, message: 'Invalid action specified' }, { status: 400 });
  } catch (error: any) {
    console.error('Reschedule/Cancel error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process appointment update' }, { status: 500 });
  }
}
