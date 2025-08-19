import { z } from 'zod'

// Buyer
export const signupBuyerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Must contain at least 8 characters")
      .regex(/[\W_0-9]/, "Must have at least one symbol or number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password inputted does not match. Please re-try",
});

// Login Buyer
export const loginBuyerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Must contain at least 8 characters")
      .regex(/[\W_0-9]/, "Must have at least one symbol or number")
  })

// Verify
export const verifySchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be exactly 6 characters"),
});

export type SignupBuyerFormValues = z.infer<typeof signupBuyerSchema>
export type LoginBuyerFormValues = z.infer<typeof loginBuyerSchema>
export type verifyFormValues = z.infer<typeof verifySchema>