// Define the validation schema for the email input
import * as yup from "yup"; // Import Yup

export const ResetSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
      "Must be a valid email address"
    ),
});

// Define the validation schema for new and confirmation passwords
export const PasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password requires at least one uppercase letter")
    .matches(/[0-9]/, "Password requires at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password requires at least one symbol")
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});
