import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email format').min(1),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
