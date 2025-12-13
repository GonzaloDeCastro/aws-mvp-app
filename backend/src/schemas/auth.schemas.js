import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    companyId: z.coerce.number().int().positive(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    companyId: z.coerce.number().int().positive(),
    email: z.string().email(),
    password: z.string().min(1),
  }),
});
