import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyStaffToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');

    if (!patientId) {
      return NextResponse.json({ success: false, message: 'Patient ID required' }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { appointments: { orderBy: { scheduledStart: 'desc' } } },
    });

    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient not found' }, { status: 404 });
    }

    // Retrieve clinical notes stored in medicalHistory JSON
    let parsedNotes: any[] = [];
    if (patient.medicalHistory) {
      try {
        const parsed = JSON.parse(patient.medicalHistory);
        parsedNotes = Array.isArray(parsed) ? parsed : [{ text: patient.medicalHistory, date: patient.updatedAt }];
      } catch {
        parsedNotes = [{ text: patient.medicalHistory, date: patient.updatedAt }];
      }
    }

    return NextResponse.json({ success: true, notes: parsedNotes, patient });
  } catch (error: any) {
    console.error('Fetch clinical notes error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch clinical records' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('artibots_staff_token')?.value;
    const session = token ? await verifyStaffToken(token) : null;

    const body = await req.json();
    const { patientId, diagnosis, treatmentPlan, alignerStage, nextVisitDate } = body;

    if (!patientId || !diagnosis || !treatmentPlan) {
      return NextResponse.json(
        { success: false, message: 'Patient ID, diagnosis, and treatment plan are required' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient record not found' }, { status: 404 });
    }

    let existingNotes: any[] = [];
    if (patient.medicalHistory) {
      try {
        const parsed = JSON.parse(patient.medicalHistory);
        existingNotes = Array.isArray(parsed) ? parsed : [{ text: patient.medicalHistory, date: patient.createdAt }];
      } catch {
        existingNotes = [{ text: patient.medicalHistory, date: patient.createdAt }];
      }
    }

    const newNote = {
      id: `NOTE-${Date.now()}`,
      author: session?.fullName || 'Dr. Preethi Subramanian',
      diagnosis,
      treatmentPlan,
      alignerStage: alignerStage || 'Consultation & Staging',
      nextVisitDate: nextVisitDate || null,
      createdAt: new Date().toISOString(),
    };

    existingNotes.unshift(newNote);

    await prisma.patient.update({
      where: { id: patientId },
      data: {
        medicalHistory: JSON.stringify(existingNotes),
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        tenantId: patient.tenantId,
        userId: session?.userId || null,
        action: 'CLINICAL_NOTE_RECORDED',
        entityType: 'PATIENT',
        entityId: patient.id,
        changes: {
          mrn: patient.medicalRecordNumber,
          diagnosis,
          alignerStage,
        },
      },
    });

    return NextResponse.json({ success: true, note: newNote }, { status: 201 });
  } catch (error: any) {
    console.error('Create clinical note error:', error);
    return NextResponse.json({ success: false, message: 'Failed to record clinical note' }, { status: 500 });
  }
}
