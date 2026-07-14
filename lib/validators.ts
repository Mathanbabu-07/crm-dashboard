import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const profileSettingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  email: z.email("Enter a valid email address."),
  bio: z.string().max(280, "Bio must be 280 characters or fewer.").optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
