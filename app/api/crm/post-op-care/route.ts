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
          action: 'POST_OP_CARE_DISPATCHED',
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, records });
    }

    const recentDispatches = await prisma.auditLog.findMany({
      where: {
        tenantId: tenant.id,
        action: 'POST_OP_CARE_DISPATCHED',
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, records: recentDispatches });
  } catch (error: any) {
    console.error('Fetch post-op care error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch care records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const {
      patientId,
      treatmentType, // "CLEAR_ALIGNERS" | "NEEDLE_FREE_RESTORATION" | "ROOT_CANAL" | "DENTAL_IMPLANT" | "TEETH_WHITENING"
      emergencyContactProvided,
    } = body;

    if (!patientId || !treatmentType) {
      return NextResponse.json(
        { success: false, message: 'Patient ID and treatment type are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient not found' }, { status: 404 });
    }

    // Curated clinical protocols by Dr. Preethi Subramanian
    const PROTOCOLS: Record<string, { title: string; instructions: string[]; caution: string }> = {
      CLEAR_ALIGNERS: {
        title: 'Clear Aligners & Tray Hygiene Care',
        instructions: [
          'Wear your aligners for 20 to 22 hours per day. Only remove to eat and brush.',
          'Clean aligners gently with lukewarm water and a soft toothbrush. Never use boiling water.',
          'Use your orthodontic chewies for 5 minutes after inserting trays to ensure snug seating.',
          'Store aligners in their protective case when eating to prevent accidental breakage.',
        ],
        caution: 'If a tray cracks or causes severe irritation, contact Dr. Preethi immediately.',
      },
      NEEDLE_FREE_RESTORATION: {
        title: 'Needle-Free Anesthesia Recovery',
        instructions: [
          'Micro-jet anesthesia wears off quickly with minimal collateral lip/tongue numbness.',
          'Avoid chewing hard foods until full sensation has completely returned (approx. 45–60 mins).',
          'Mild tenderness at the injection site is normal and resolves within hours.',
        ],
        caution: 'Avoid drinking scalding hot beverages while tissue numbness is still dissipating.',
      },
      ROOT_CANAL: {
        title: 'Endodontic Care & Post-Op Guidelines',
        instructions: [
          'Do not chew on the treated side until the permanent restoration/crown is placed.',
          'Take prescribed anti-inflammatory medications strictly on schedule as directed.',
          'Maintain gentle brushing and flossing around the temporary seal.',
        ],
        caution: 'Mild discomfort when biting is normal for 2-3 days while the ligament settles.',
      },
      DENTAL_IMPLANT: {
        title: 'Surgical Implant & Tissue Care',
        instructions: [
          'Keep ice pack applied to cheek intermittently (15 mins on / 15 mins off) for the first 12 hours.',
          'Stick to soft, cool foods (curd rice, smoothies, soups) for the first 48 hours.',
          'Do not vigorously spit or rinse with force on Day 1 to protect the clot.',
          'Start warm saltwater rinses gently after 24 hours (3 times daily).',
        ],
        caution: 'Avoid smoking or strenuous workouts for 72 hours following implant surgery.',
      },
      TEETH_WHITENING: {
        title: 'Post-Whitening White Diet Protocol',
        instructions: [
          'Observe the "White Diet" strictly for 48 hours (avoid tea, coffee, turmeric, red wine, colas).',
          'Use prescribed sensitivity relief paste if transient sensitivity occurs.',
          'Rinse thoroughly with plain water after consuming any pigmented foods.',
        ],
        caution: 'Enamel pores remain receptive to staining for 48 hours following clinical bleaching.',
      },
    };

    const selectedProtocol = PROTOCOLS[treatmentType] || PROTOCOLS.CLEAR_ALIGNERS;
    const protocolId = `CARE-PD-${Date.now().toString().slice(-6)}`;

    const careRecord = {
      protocolId,
      patientId: patient.id,
      patientName: patient.fullName,
      mrn: patient.medicalRecordNumber,
      treatmentType,
      selectedProtocol,
      dispatchedBy: session?.fullName || 'Dr. Preethi Subramanian',
      timestamp: new Date().toISOString(),
    };

    // 1. Audit Log Record
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'POST_OP_CARE_DISPATCHED',
        entityType: 'PATIENT_CARE',
        entityId: patient.id,
        changes: careRecord,
      },
    });

    // 2. Format WhatsApp Clinical Message
    const instructionsText = selectedProtocol.instructions
      .map((item, idx) => `${idx + 1}. ${item}`)
      .join('\n');

    const whatsappMessage = `*Dr. Preethi's Dentistry — Post-Treatment Care Guide*\n` +
      `Patient: ${patient.fullName} (${patient.medicalRecordNumber})\n` +
      `Care Protocol: *${selectedProtocol.title}*\n\n` +
      `*Clinical Instructions:*\n${instructionsText}\n\n` +
      `*Special Advice:* ${selectedProtocol.caution}\n\n` +
      `Need urgent support? Call our Saibaba Colony helpline: +91 78128 71829.`;

    // 3. Queue WhatsApp Communication Log
    await prisma.communicationLog.create({
      data: {
        tenantId: patient.tenantId,
        recipientPhone: patient.phoneNumber,
        channel: 'WHATSAPP',
        direction: 'OUTBOUND',
        templateName: 'post_op_care_guidelines',
        messageBody: whatsappMessage,
        status: 'QUEUED',
        metadata: careRecord,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Post-operative care guidelines dispatched to patient via WhatsApp.',
        careRecord,
        whatsappText: whatsappMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Post-op care dispatch error:', error);
    return NextResponse.json({ success: false, message: 'Failed to dispatch care guidelines' }, { status: 500 });
  }
}
