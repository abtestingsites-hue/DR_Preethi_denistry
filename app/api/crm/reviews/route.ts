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
      const records = await prisma.auditLog.findMany({
        where: {
          tenantId: tenant.id,
          entityId: patientId,
          action: 'FEEDBACK_INVITE_SENT',
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, records });
    }

    const allInvites = await prisma.auditLog.findMany({
      where: {
        tenantId: tenant.id,
        action: 'FEEDBACK_INVITE_SENT',
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, invites: allInvites });
  } catch (error: any) {
    console.error('Fetch review invites error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch review invites' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const { patientId, treatmentCompleted, ratingRequested } = body;

    if (!patientId) {
      return NextResponse.json(
        { success: false, message: 'Patient ID is required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient not found' }, { status: 404 });
    }

    // Official Google Review destination for Dr. Preethi's Dentistry
    const googleReviewUrl = 'https://maps.app.goo.gl/UCy9MqjMcKPTzWp69';

    const inviteRecord = {
      inviteId: `REV-PD-${Date.now().toString().slice(-6)}`,
      patientId: patient.id,
      patientName: patient.fullName,
      mrn: patient.medicalRecordNumber,
      treatmentCompleted: treatmentCompleted || 'Consultation & Treatment',
      ratingRequested: ratingRequested || 5,
      googleReviewUrl,
      sentByStaff: session?.fullName || 'Dr. Preethi Subramanian',
      timestamp: new Date().toISOString(),
    };

    // 1. Audit Log Record
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'FEEDBACK_INVITE_SENT',
        entityType: 'PATIENT_REVIEW',
        entityId: patient.id,
        changes: inviteRecord,
      },
    });

    // 2. Queue WhatsApp Review Invitation
    const whatsappText = `*Dr. Preethi's Dentistry — Patient Experience Feedback*\n` +
      `Vanakkam ${patient.fullName},\n\n` +
      `Thank you for trusting Dr. Preethi Subramanian with your smile and ${inviteRecord.treatmentCompleted}.\n\n` +
      `Your feedback helps us continuously elevate our gentle orthodontic and needle-free clinical standard in Coimbatore.\n\n` +
      `Could you take 30 seconds to share your experience on our official Google Business profile?\n` +
      `⭐ *Share Your Google Review:* ${googleReviewUrl}\n\n` +
      `With warm regards,\n` +
      `Dr. Preethi's Dentistry Team | Saibaba Colony`;

    await prisma.communicationLog.create({
      data: {
        tenantId: patient.tenantId,
        recipientPhone: patient.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'google_review_feedback_request',
        messageBody: whatsappText,
        status: 'QUEUED',
        metadata: inviteRecord,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Google Review invitation queued for WhatsApp dispatch.',
        inviteRecord,
        whatsappText,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Send review invite error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send review invite' }, { status: 500 });
  }
}
