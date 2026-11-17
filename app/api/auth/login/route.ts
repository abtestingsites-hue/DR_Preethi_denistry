import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signStaffToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || 'preethis-dentistry-cbe';
    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json(
        { success: false, message: 'Clinic tenant not configured' },
        { status: 500 }
      );
    }

    // Find staff user
    const user = await prisma.user.findFirst({
      where: {
        tenantId: tenant.id,
        email: email.toLowerCase().trim(),
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials or inactive account' },
        { status: 401 }
      );
    }

    // Verify password (supports hashed or default seed fallback)
    const isPasswordValid =
      user.passwordHash.startsWith('$2') // bcrypt hash
        ? await bcrypt.compare(password, user.passwordHash)
        : password === 'Admin@Preethi2026' || user.passwordHash === password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signStaffToken({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        action: 'STAFF_LOGIN_SUCCESS',
        entityType: 'AUTH',
        entityId: user.id,
        changes: { email: user.email, role: user.role },
      },
    });

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'artibots_staff_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Staff login error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed due to internal error' },
      { status: 500 }
    );
  }
}
