import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CreateLeadSchema } from '@/lib/validations/lead';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = CreateLeadSchema.parse(body);

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';

    // Retrieve or verify tenant
    let tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      tenant = await prisma.tenant.create({
        data: {
          slug: tenantSlug,
          name: "Dr. Preethi's Dentistry",
          phone: '+917812871829',
          email: 'drpreethisdentistry@gmail.com',
          address: 'Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road, Saibaba Colony',
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          country: 'India',
        },
      });
    }

    // Assign default clinical director / staff
    const defaultAssignee = await prisma.user.findFirst({
      where: { tenantId: tenant.id, role: 'CLINIC_ADMIN' },
    });

    const lead = await prisma.lead.create({
      data: {
        tenantId: tenant.id,
        fullName: validatedData.fullName,
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email || null,
        treatmentSlug: validatedData.treatmentSlug,
        source: validatedData.source,
        status: 'NEW',
        notes: validatedData.notes || null,
        assignedToUserId: defaultAssignee ? defaultAssignee.id : null,
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        action: 'LEAD_CREATED',
        entityType: 'LEAD',
        entityId: lead.id,
        changes: {
          fullName: lead.fullName,
          treatment: lead.treatmentSlug,
          source: lead.source,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received successfully.',
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lead ingestion error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid inquiry data submitted.',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing consultation inquiry.',
      },
      { status: 500 }
    );
  }
}
