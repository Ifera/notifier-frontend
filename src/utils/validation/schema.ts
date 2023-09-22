import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have more than 6 characters'),
});

export const formDataSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must have more than 3 characters')
    .max(50, 'Name is too long')
    .optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(3, 'Description must have more than 3 characters')
    .max(255, 'Description is too long')
    .optional(),
  auth: z
    .object({
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must have more than 6 characters'),
    })
    .optional(),
  notification: z
    .object({
      template_subject: z
        .string()
        .min(1, 'Subject is required')
        .min(5, 'Subject must have more than 5 characters')
        .max(50, 'Subject is too long'),

      template_body: z
        .string()
        .min(1, 'Body is required')
        .min(5, 'Body must be at least 5 characters long')
        .max(1024, 'Body is too long'),
    })
    .optional(),
});
