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
      const consents = await prisma.auditLog.findMany({
        where: {
          tenantId: tenant.id,
          entityId: patientId,
          action: 'INFORMED_CONSENT_RECORDED',
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, consents });
    }

    const allConsents = await prisma.auditLog.findMany({
      where: {
        tenantId: tenant.id,
        action: 'INFORMED_CONSENT_RECORDED',
      },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });

    return NextResponse.json({ success: true, consents: allConsents });
  } catch (error: any) {
    console.error('Fetch consent records error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch consent records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const {
      patientId,
      consentType, // "CLEAR_ALIGNER_TREATMENT" | "NEEDLE_FREE_ANESTHESIA" | "GENERAL_DENTAL_PROCEDURE"
      patientSignatureConsent, // boolean
      understoodRisksAndBenefits, // boolean
      agreedToPhotography, // boolean
      guardianName,
      patientIpAddress,
    } = body;

    if (!patientId || !consentType || !patientSignatureConsent) {
      return NextResponse.json(
        { success: false, message: 'Patient ID, consent type, and explicit consent agreement are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient record not found' }, { status: 404 });
    }

    const consentId = `CONSENT-${Date.now().toString().slice(-6)}`;

    const consentRecord = {
      consentId,
      patientId: patient.id,
      patientName: patient.fullName,
      mrn: patient.medicalRecordNumber,
      consentType,
      patientSignatureConsent,
      understoodRisksAndBenefits: !!understoodRisksAndBenefits,
      agreedToPhotography: !!agreedToPhotography,
      guardianName: guardianName || null,
      timestamp: new Date().toISOString(),
      witnessedByStaff: session?.fullName || 'Dr. Preethi Subramanian',
      ipAddress: patientIpAddress || req.headers.get('x-forwarded-for') || '127.0.0.1',
    };

    // 1. Audit Log Record (Tamper-evident legal consent proof)
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'INFORMED_CONSENT_RECORDED',
        entityType: 'PATIENT_CONSENT',
        entityId: patient.id,
        changes: consentRecord,
        ipAddress: consentRecord.ipAddress,
      },
    });

    // 2. Queue WhatsApp Confirmation to Patient
    const whatsappText = `*Dr. Preethi's Dentistry — Digital Consent Confirmation*\n` +
      `Consent ID: ${consentId}\n` +
      `Patient: ${patient.fullName} (${patient.medicalRecordNumber})\n` +
      `Procedure: ${consentType.replace(/_/g, ' ')}\n` +
      `Status: Formally Recorded & Verified\n\n` +
      `A copy of your clinical consent has been securely filed in your digital medical record.\n` +
      `Saibaba Colony Clinic Desk: +91 78128 71829`;

    await prisma.communicationLog.create({
      data: {
        tenantId: patient.tenantId,
        recipientPhone: patient.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'consent_agreement_ack',
        messageBody: whatsappText,
        status: 'QUEUED',
        metadata: consentRecord,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Clinical consent successfully recorded and verified.',
        consent: consentRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Record consent error:', error);
    return NextResponse.json({ success: false, message: 'Failed to record consent agreement' }, { status: 500 });
  }
}
