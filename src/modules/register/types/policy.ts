import { z } from 'zod';

export enum Policy {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export const userPolicyRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dob: z.string(),
  policy: z.string(),
});

export type UserPolicyRequest = z.infer<typeof userPolicyRequestSchema>;

export const userPolicySchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dob: z.string(),
  policy: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type UserPolicyResponse = z.infer<typeof userPolicySchema>;
