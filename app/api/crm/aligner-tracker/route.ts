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
      return NextResponse.json({ success: false, message: 'Tenant not found' }, { status: 404 });
    }

    if (patientId) {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        select: {
          id: true,
          fullName: true,
          medicalRecordNumber: true,
          phoneNumber: true,
          medicalHistory: true,
        },
      });

      return NextResponse.json({ success: true, patient });
    }

    // Return all active cases tracked in audit logs
    const cases = await prisma.auditLog.findMany({
      where: {
        tenantId: tenant.id,
        action: 'ALIGNER_CASE_UPDATED',
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, cases });
  } catch (error: any) {
    console.error('Fetch aligner cases error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch aligner cases' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const {
      patientId,
      systemType, // "Invisalign" | "GoClear"
      totalTrays,
      currentTray,
      wearDaysPerTray, // default 10 or 14
      treatmentStartDate,
      attachmentsPlaced,
      iprPerformed,
      nextTrayChangeDate,
      clinicalObservations,
    } = body;

    if (!patientId || !systemType || !totalTrays || !currentTray) {
      return NextResponse.json(
        { success: false, message: 'Patient, system type, and tray staging numbers are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient not found' }, { status: 404 });
    }

    const progressPercentage = Math.min(100, Math.round((currentTray / totalTrays) * 100));

    const caseData = {
      systemType,
      totalTrays: Number(totalTrays),
      currentTray: Number(currentTray),
      wearDaysPerTray: Number(wearDaysPerTray || 10),
      treatmentStartDate: treatmentStartDate || new Date().toISOString(),
      progressPercentage,
      attachmentsPlaced: !!attachmentsPlaced,
      iprPerformed: !!iprPerformed,
      nextTrayChangeDate: nextTrayChangeDate || null,
      clinicalObservations: clinicalObservations || 'Tracking optimally. Good tray adaptation.',
      updatedAt: new Date().toISOString(),
      updatedBy: session?.fullName || 'Dr. Preethi Subramanian',
    };

    // 1. Audit Log Record
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'ALIGNER_CASE_UPDATED',
        entityType: 'PATIENT',
        entityId: patient.id,
        changes: caseData,
      },
    });

    // 2. Queue WhatsApp Milestone Update to Patient
    const whatsappText = `*Dr. Preethi's Dentistry — Aligner Staging Milestone*\n` +
      `Patient: ${patient.fullName} (${patient.medicalRecordNumber})\n` +
      `System: ${systemType} Clear Aligners\n` +
      `Current Progress: *Tray ${currentTray} of ${totalTrays}* (${progressPercentage}% Completed)\n\n` +
      `*Next Tray Switch:* ${nextTrayChangeDate ? new Date(nextTrayChangeDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'As advised by doctor'}\n` +
      `*Doctor Note:* ${caseData.clinicalObservations}\n\n` +
      `Remember: Wear your aligners 22 hours daily and use chewies for optimal fit.\n` +
      `Saibaba Colony Clinic Desk: +91 78128 71829`;

    await prisma.communicationLog.create({
      data: {
        tenantId: patient.tenantId,
        recipientPhone: patient.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'aligner_progress_milestone',
        messageBody: whatsappText,
        status: 'QUEUED',
        metadata: caseData,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Aligner case progress updated and WhatsApp milestone alert queued.',
        caseData,
        whatsappText,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update aligner case error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update aligner case' }, { status: 500 });
  }
}
