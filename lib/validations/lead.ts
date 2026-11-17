import { z } from 'zod';

export const CreateLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[+0-9\s-]+$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  treatmentSlug: z.string().min(1, 'Treatment selection is required'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  source: z.enum(['WEBSITE', 'WHATSAPP', 'DIRECT', 'PHONE', 'INSTAGRAM']).default('WEBSITE'),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;

export const CreateAppointmentSchema = z.object({
  fullName: z.string().min(2, 'Name is required').trim(),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  treatmentType: z.string().min(1, 'Treatment is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTimeSlot: z.string().min(1, 'Time slot is required'),
  notes: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>;
