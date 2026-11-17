import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'artibots-preethis-dentistry-jwt-secret-key-2026'
);

export interface StaffTokenPayload {
  userId: string;
  email: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'CLINIC_ADMIN' | 'DENTIST' | 'RECEPTIONIST';
  tenantId: string;
  tenantSlug: string;
}

export async function signStaffToken(payload: StaffTokenPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyStaffToken(token: string): Promise<StaffTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as StaffTokenPayload;
  } catch (error) {
    return null;
  }
}
