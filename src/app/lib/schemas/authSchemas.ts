import { z } from "zod";
// Regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .regex(emailRegex, "Please enter a valid email address"),
    avatar: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must be less than 100 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Zod Schema for validation
export const profileSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long." })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional(),
    image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      // If a new password is entered, the current password is required
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Current password is required to set a new one.",
      path: ["currentPassword"],
    }
  )
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type FormData = z.infer<typeof profileSchema>;
export type FormErrors = z.ZodFormattedError<FormData> | null;
