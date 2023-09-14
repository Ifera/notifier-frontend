import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email format').min(1),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const dataSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long'),
  template_subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters long')
    .optional(),
  template_body: z
    .string()
    .min(5, 'Body must be at least 5 characters long')
    .optional(),
});
