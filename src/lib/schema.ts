import { z } from 'zod'

const phoneRegex = /^(\+?234|(\+?\d{1,3}))?[7-9]\d{9}$|^(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

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

// Signup Vendor
export const signupVendorSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
})

export const createPasswordSchema = z.object({
  password: z
      .string()
      .min(8, "Must contain at least 8 characters")
      .regex(/[\W_0-9]/, "Must have at least one symbol or number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password inputted does not match. Please re-try",
})

export const businessInfoSchema = z
  .object({
    business_name: z.string().min(1, "Business name is required"),
    shop_address: z.string().min(1, "Shop Address is required"),
    phone_number: z
        .string()
        .min(1, { message: "Phone number is required" })
        .refine((value) => phoneRegex.test(value), { message: "Invalid phone number format" }),
    state: z.string().min(1, "State is required"),
});
export type CreatePasswordValues = z.infer<typeof createPasswordSchema>
export type SignupBuyerFormValues = z.infer<typeof signupBuyerSchema>
export type SignupVendorFormValues = z.infer<typeof signupVendorSchema>
export type LoginBuyerFormValues = z.infer<typeof loginBuyerSchema>
export type verifyFormValues = z.infer<typeof verifySchema>
export type BusinessInfoValues = z.infer<typeof businessInfoSchema>