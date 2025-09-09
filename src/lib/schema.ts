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

// Initiate Reset Password
export const InitiateResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Create Product
export const AddProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  short_description: z.string().min(5, "Short description is required"),
  description: z.string().min(10, "Description is required"),
  category: z.string().min(1, "Invalid category ID"),
  available_sizes: z.array(
    z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
      message: "Invalid size" 
    })
  ).min(1, "At least one size must be selected"),
  gender: z.enum(["UNISEX", "MEN", "WOMEN"], {
    message: "Gender must be UNISEX, MEN, or WOMEN"
  }),
  available_colors: z
  .array(
    z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color")
  )
  .min(1, "At least one color must be selected"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  discount_type: z.enum(["PERCENTAGE", "FIXED"], {
   message: "Discount type must be PERCENTAGE or FIXED",
  }),
  discount_value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid discount value"),
  // is_active: z.boolean(),
  low_stock_threshold: z.string().min(1, "Threshold must be at least 1"),
  stock_items: z.array(
    z.object({
      size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
      color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color"),
      stock_quantity: z.number().min(0, "Stock cannot be negative"),
    })
  ),
});

// Create Review
export const CreateReviewSchema = z.object({
  rating: z.number().min(1, "Please give at least 1 star"),
  recommend: z.enum(["Yes", "No"]).refine((val) => !!val, {
    message: "Please select"
  }),
  nickname: z.string().optional(),
  review_description: z.string().optional(),
  review_text: z.string().optional()
})
export type CreatePasswordValues = z.infer<typeof createPasswordSchema>
export type SignupBuyerFormValues = z.infer<typeof signupBuyerSchema>
export type SignupVendorFormValues = z.infer<typeof signupVendorSchema>
export type LoginBuyerFormValues = z.infer<typeof loginBuyerSchema>
export type verifyFormValues = z.infer<typeof verifySchema>
export type BusinessInfoValues = z.infer<typeof businessInfoSchema>
export type InitiateResetValues = z.infer<typeof InitiateResetSchema>
export type ProductFormData = z.infer<typeof AddProductSchema>;
export type ReviewFormData = z.infer<typeof CreateReviewSchema>