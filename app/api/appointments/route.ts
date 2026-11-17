import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CreateAppointmentSchema } from '@/lib/validations/lead';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = CreateAppointmentSchema.parse(body);

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';

    let tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      tenant = await prisma.tenant.findFirst();
    }

    if (!tenant) {
      return NextResponse.json(
        { success: false, message: 'Tenant clinic not configured.' },
        { status: 500 }
      );
    }

    // 1. Ingest/Find Patient
    let patient = await prisma.patient.findFirst({
      where: {
        tenantId: tenant.id,
        phoneNumber: validatedData.phoneNumber,
      },
    });

    if (!patient) {
      const count = await prisma.patient.count({ where: { tenantId: tenant.id } });
      const mrn = `MRN-PD-${String(count + 1001).padStart(5, '0')}`;

      patient = await prisma.patient.create({
        data: {
          tenantId: tenant.id,
          medicalRecordNumber: mrn,
          fullName: validatedData.fullName,
          phoneNumber: validatedData.phoneNumber,
          medicalHistory: validatedData.notes || null,
        },
      });
    }

    // Parse scheduled dates
    const startDate = new Date(`${validatedData.preferredDate}T${validatedData.preferredTimeSlot}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 min duration default

    // Find primary doctor
    const dentist = await prisma.user.findFirst({
      where: { tenantId: tenant.id, role: 'CLINIC_ADMIN' },
    });

    // 2. Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        tenantId: tenant.id,
        patientId: patient.id,
        dentistId: dentist?.id || null,
        treatmentType: validatedData.treatmentType,
        scheduledStart: isNaN(startDate.getTime()) ? new Date() : startDate,
        scheduledEnd: isNaN(endDate.getTime()) ? new Date(Date.now() + 1800000) : endDate,
        status: 'PENDING',
        notes: validatedData.notes || null,
      },
    });

    // 3. Queue WhatsApp Communication Log
    await prisma.communicationLog.create({
      data: {
        tenantId: tenant.id,
        appointmentId: appointment.id,
        recipientPhone: validatedData.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'appointment_consultation_request_ack',
        messageBody: `Vanakkam ${validatedData.fullName}, your consultation request for ${validatedData.treatmentType} at Dr. Preethi's Dentistry (Saibaba Colony, Coimbatore) has been received. Our clinic desk will confirm your slot shortly.`,
        status: 'QUEUED',
      },
    });

    // 4. Audit Log
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        action: 'APPOINTMENT_REQUESTED',
        entityType: 'APPOINTMENT',
        entityId: appointment.id,
        changes: {
          patientName: patient.fullName,
          treatment: appointment.treatmentType,
          slot: validatedData.preferredTimeSlot,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment consultation request logged successfully.',
        appointmentId: appointment.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Appointment booking error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid appointment details provided.',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process appointment booking.',
      },
      { status: 500 }
    );
  }
}
