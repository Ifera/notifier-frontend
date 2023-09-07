import { z, ZodError } from 'zod';

// Define a Zod schema for the User type
const userSchema = z.object({
  email: z.string().email('Invalid email format').min(1),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type User = z.infer<typeof userSchema>;
export type UserError = ZodError<typeof userSchema>;
