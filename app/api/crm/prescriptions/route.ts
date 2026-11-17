import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyStaffToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant clinic not found' }, { status: 404 });
    }

    // Retrieve prescriptions stored in metadata of communication/audit logs or patient record
    if (patientId) {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { appointments: { orderBy: { scheduledStart: 'desc' } } },
      });

      return NextResponse.json({ success: true, patient });
    }

    // Return all recent prescriptions logged
    const recentLogs = await prisma.auditLog.findMany({
      where: {
        tenantId: tenant.id,
        action: 'PRESCRIPTION_GENERATED',
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, prescriptions: recentLogs });
  } catch (error: any) {
    console.error('Fetch prescriptions error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch prescriptions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const {
      patientId,
      medications, // Array of { name, dosage, frequency, duration, instructions }
      clinicalAdvice,
      alignerInstructions,
    } = body;

    if (!patientId || !medications || !Array.isArray(medications)) {
      return NextResponse.json(
        { success: false, message: 'Patient ID and medication list are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient record not found' }, { status: 404 });
    }

    const prescriptionId = `RX-PD-${Date.now().toString().slice(-6)}`;

    const rxRecord = {
      prescriptionId,
      patientName: patient.fullName,
      mrn: patient.medicalRecordNumber,
      prescribedBy: session?.fullName || 'Dr. Preethi Subramanian, MDS',
      doctorRegNo: 'DCI-TN-34821',
      date: new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }),
      medications,
      clinicalAdvice: clinicalAdvice || 'Maintain optimal oral hygiene. Rinse after aligner wear.',
      alignerInstructions: alignerInstructions || 'Wear aligners 22 hours daily. Change tray strictly per 3D schedule.',
    };

    // 1. Audit Log Record
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'PRESCRIPTION_GENERATED',
        entityType: 'PATIENT',
        entityId: patient.id,
        changes: rxRecord,
      },
    });

    // 2. Queue WhatsApp Delivery to Patient
    const medSummary = medications
      .map((m: any, idx: number) => `${idx + 1}. ${m.name} (${m.dosage}) - ${m.frequency} for ${m.duration}`)
      .join('\n');

    const whatsappMessage = `*Dr. Preethi's Dentistry — Digital Prescription*\n` +
      `Prescription No: ${prescriptionId}\n` +
      `Patient: ${patient.fullName} (${patient.medicalRecordNumber})\n` +
      `Doctor: Dr. Preethi Subramanian, MDS (Orthodontics)\n\n` +
      `*Prescribed Medications:*\n${medSummary}\n\n` +
      `*Clinical Instructions:*\n${rxRecord.clinicalAdvice}\n\n` +
      `*Aligner Protocol:*\n${rxRecord.alignerInstructions}\n\n` +
      `Clinic Desk: +91 78128 71829 | Saibaba Colony, Coimbatore`;

    await prisma.communicationLog.create({
      data: {
        tenantId: patient.tenantId,
        recipientPhone: patient.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'digital_prescription_slip',
        messageBody: whatsappMessage,
        status: 'QUEUED',
        metadata: rxRecord,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Prescription generated and queued for WhatsApp dispatch.',
        prescription: rxRecord,
        whatsappText: whatsappMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Generate prescription error:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate digital prescription' }, { status: 500 });
  }
}
