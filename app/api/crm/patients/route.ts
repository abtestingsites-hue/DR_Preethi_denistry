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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    const patients = await prisma.patient.findMany({
      where: {
        tenantId: tenant.id,
        ...(search
          ? {
              OR: [
                { fullName: { contains: search, mode: 'insensitive' } },
                { phoneNumber: { contains: search } },
                { medicalRecordNumber: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        appointments: {
          orderBy: { scheduledStart: 'desc' },
          take: 5,
        },
        lead: {
          select: { source: true, treatmentSlug: true, createdAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, patients });
  } catch (error: any) {
    console.error('Fetch patients error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch patient directory' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phoneNumber, email, medicalHistory, dateOfBirth } = body;

    if (!fullName || !phoneNumber) {
      return NextResponse.json({ success: false, message: 'Full name and phone number are required' }, { status: 400 });
    }

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant clinic not found' }, { status: 404 });
    }

    const count = await prisma.patient.count({ where: { tenantId: tenant.id } });
    const mrn = `MRN-PD-${String(count + 1001).padStart(5, '0')}`;

    const newPatient = await prisma.patient.create({
      data: {
        tenantId: tenant.id,
        medicalRecordNumber: mrn,
        fullName,
        phoneNumber,
        email: email || null,
        medicalHistory: medicalHistory || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        action: 'PATIENT_RECORD_CREATED',
        entityType: 'PATIENT',
        entityId: newPatient.id,
        changes: { fullName, mrn, phoneNumber },
      },
    });

    return NextResponse.json({ success: true, patient: newPatient }, { status: 201 });
  } catch (error: any) {
    console.error('Create patient error:', error);
    return NextResponse.json({ success: false, message: 'Failed to create patient record' }, { status: 500 });
  }
}
