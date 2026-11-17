import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get('date'); // Format: YYYY-MM-DD

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json(
        { success: false, message: 'Valid date parameter required (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });

    if (!tenant) {
      return NextResponse.json({ success: false, message: 'Tenant clinic not configured' }, { status: 404 });
    }

    // Saibaba Colony Standard Consultation Slots (30 min increments)
    const STANDARD_SLOTS = [
      // Morning Session
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      // Evening Session
      '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
    ];

    // Query booked appointments for that day
    const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
    const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        tenantId: tenant.id,
        scheduledStart: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      select: { scheduledStart: true },
    });

    // Extract booked HH:mm strings
    const bookedSlotTimes = new Set(
      bookedAppointments.map((appt) => {
        const d = new Date(appt.scheduledStart);
        const hours = String(d.getUTCHours()).padStart(2, '0');
        const minutes = String(d.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      })
    );

    const slotAvailability = STANDARD_SLOTS.map((time) => ({
      time,
      displayTime: convertToDisplayTime(time),
      available: !bookedSlotTimes.has(time),
    }));

    return NextResponse.json({
      success: true,
      date: dateStr,
      clinic: tenant.name,
      doctor: 'Dr. Preethi Subramanian, MDS',
      slots: slotAvailability,
    });
  } catch (error: any) {
    console.error('Availability check error:', error);
    return NextResponse.json({ success: false, message: 'Failed to verify slot availability' }, { status: 500 });
  }
}

function convertToDisplayTime(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${mStr} ${ampm}`;
}
