import { prisma } from '../lib/db';

async function main() {
  console.log('Seeding Artibots Multi-Tenant Database...');

  // 1. Seed Flagship Tenant: Dr. Preethi's Dentistry
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'preethis-dentistry-cbe' },
    update: {},
    create: {
      slug: 'preethis-dentistry-cbe',
      name: "Dr. Preethi's Dentistry",
      phone: '+917812871829',
      email: 'drpreethisdentistry@gmail.com',
      address: 'Second Floor, Saro Enclave, 7th Cross, Bharathi Park Road, Saibaba Colony',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
      settings: {
        theme: {
          primaryColor: '#7B8052',
          deepColor: '#465239',
          accentColor: '#8FA36C',
        },
        services: [
          'Invisalign & Clear Aligners',
          'GoClear Aligners',
          'Orthodontic Treatment',
          'Root Canal Treatment',
          'Teeth Whitening',
          'Dental Implants',
          'Dental Veneers',
          '100% Needle-Free Care',
        ],
        coordinates: {
          lat: 11.019515,
          lng: 76.9402281,
        },
      },
    },
  });

  console.log(`✓ Flagship Tenant verified: ${tenant.name} (${tenant.id})`);

  // 2. Seed Initial Admin & Dentist User
  const adminUser = await prisma.user.upsert({
    where: {
      tenantId_email: {
        tenantId: tenant.id,
        email: 'drpreethi@preethisdentistry.com',
      },
    },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'drpreethi@preethisdentistry.com',
      passwordHash: 'REPLACE_WITH_ARGON2_HASH_IN_PROD',
      fullName: 'Dr. Preethi Subramanian',
      role: 'CLINIC_ADMIN',
      isActive: true,
    },
  });

  console.log(`✓ Primary Clinical Director user verified: ${adminUser.fullName}`);

  // 3. Seed Sample Initial Aligner Lead
  const sampleLead = await prisma.lead.create({
    data: {
      tenantId: tenant.id,
      fullName: 'Karthik Raja',
      phoneNumber: '+919876543210',
      email: 'karthik.raja@example.com',
      treatmentSlug: 'invisalign-clear-aligners',
      source: 'WEBSITE',
      status: 'NEW',
      notes: 'Interested in GoClear aligners consultation for mild crowding.',
      assignedToUserId: adminUser.id,
    },
  });

  console.log(`✓ Sample Consultation Lead ingested: ${sampleLead.fullName} (${sampleLead.id})`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
