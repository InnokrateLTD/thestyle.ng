import { z } from "zod";

const phoneRegex =
  /^(\+?234|(\+?\d{1,3}))?[7-9]\d{9}$|^(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

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
export const loginBuyerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Must contain at least 8 characters")
    .regex(/[\W_0-9]/, "Must have at least one symbol or number"),
});

// Verify
export const verifySchema = z.object({
  code: z.string().length(6, "Verification code must be exactly 6 characters"),
});

export const PayoutSchema = z.object({
  amount: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^[0-9]{1,3}(?:,[0-9]{3})*(?:\.\d{1,2})?$/.test(val) || /^[0-9]+(\.\d{1,2})?$/.test(val),
      "Enter a valid amount (e.g. 1,000 or 2500.50)"
    )
    // Convert commas out and to number
    .transform((val) => Number(val.replace(/,/g, "")))
    .refine((num) => num > 0, "Amount must be greater than zero"),
});

// Signup Vendor
export const signupVendorSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export const createPasswordSchema = z
  .object({
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

export const businessInfoSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  shop_address: z.string().min(1, "Shop Address is required"),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number format",
    }),
  state: z.string().min(1, "State is required"),
});

export const bankDetailsSchema = z.object({
  account_name: z.string().min(1, "Account name is required"),
  account_number: z
    .string()
    .min(1, "Account number is required")
    .regex(/^\d{10}$/, "Account number must be exactly 10 digits"),
  bank: z.object({
  code: z.string().min(1, "Bank code is required"),
  name: z.string().min(3, "Bank name is required"),
}), 
});

export const storeInfoSchema = z.object({
  store_name: z.string().min(1, "Store name is required"),
  business_name: z.string().min(1, "Business name is required"),
  store_description: z.string().min(1, "Store description is required"), 
  address: z.string().min(1, "Shop Address is required"),
  contact_number: z
    .string()
    .min(1, { message: "Contact number is required" })
    .refine((value) => phoneRegex.test(value), {
      message: "Invalid contact number format",
    }),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zip_code: z.string().optional()
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
  available_sizes: z
    .array(
      z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
        message: "Invalid size",
      })
    )
    .min(1, "At least one size must be selected"),
  gender: z.enum(["UNISEX", "MEN", "WOMEN"], {
    message: "Gender must be UNISEX, MEN, or WOMEN",
  }),
  available_colors: z
    .array(z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color"))
    .min(1, "At least one color must be selected"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
  discount_type: z.enum(["PERCENTAGE", "FIXED"], {
    message: "Discount type must be PERCENTAGE or FIXED",
  }),
  discount_value: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid discount value"),
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
    message: "Please select",
  }),
  nickname: z.string().optional(),
  review_description: z.string().optional(),
  review_text: z.string().optional(),
});

// Create orders
export const CreateOrderSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number format",
    }),
  address_line: z.string().min(1, "Address is required"),
  town_city: z.string().min(1, "Town is required"),
  state: z.string().min(1, "State is required"),
  save_address: z.boolean().optional(),
  promo_code: z.string().optional(),
  delivery_method: z.enum(["STANDARD", "PREMIUM", "PICKUP"], {
  message: "Delivery method must be STANDARD or PREMIUM or PICKUP",
  }),
});

// Profile Details
export const ProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number format",
    }),
  email: z.string().min(1, "Email is required")
});
// Save Address
export const AddressSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number format",
    }),
  address_line: z.string().min(1, "Address is required"),
  town_city: z.string().min(1, "Town is required"),
  state: z.string().min(1, "State is required"),
  is_default: z.boolean().optional()
});

// Reset
export const ResetPasswordSchema = z.object({
  old_password: z
    .string()
    .min(8, "Must contain at least 8 characters")
    .regex(/[\W_0-9]/, "Must have at least one symbol or number"),
  new_password: z
    .string()
    .min(8, "Must contain at least 8 characters")
    .regex(/[\W_0-9]/, "Must have at least one symbol or number"),
});
export type CreatePasswordValues = z.infer<typeof createPasswordSchema>;
export type SignupBuyerFormValues = z.infer<typeof signupBuyerSchema>;
export type SignupVendorFormValues = z.infer<typeof signupVendorSchema>;
export type LoginBuyerFormValues = z.infer<typeof loginBuyerSchema>;
export type verifyFormValues = z.infer<typeof verifySchema>;
export type BusinessInfoValues = z.infer<typeof businessInfoSchema>;
export type StoreInfoValues = z.infer<typeof storeInfoSchema>
export type InitiateResetValues = z.infer<typeof InitiateResetSchema>;
export type ProductFormData = z.infer<typeof AddProductSchema>;
export type ReviewFormData = z.infer<typeof CreateReviewSchema>;
export type CreateOrderFormValues = z.infer<typeof CreateOrderSchema>
export type ProfileFormValues = z.infer<typeof ProfileSchema>
export type AddressFormValues = z.infer<typeof AddressSchema>
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>
export type bankDetailsFormValues = z.infer<typeof bankDetailsSchema>
export type PayoutFormValue = z.infer<typeof PayoutSchema>