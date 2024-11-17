import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  firstName: z.string().min(4).max(20),
  lastName: z.string().min(4).max(20),
  email: z.string(),
  password: z.string(),
});
