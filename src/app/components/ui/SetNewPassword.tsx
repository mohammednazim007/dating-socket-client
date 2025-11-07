"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Removed: import { PasswordSchema } from "@/app/lib/schemas/resetPasswordSchema";

// Define the shape of the form data
type PasswordFields = {
  newPassword: string;
  confirmPassword: string;
};

// Define the validation schema (now defined locally to resolve the import error)
const PasswordSchema = yup.object().shape({
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

const SetNewPassword: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFields>({
    resolver: yupResolver(PasswordSchema) as any,
    mode: "onBlur",
  });

  // Submission handler (only called if validation succeeds)
  const onSubmit: SubmitHandler<PasswordFields> = (data) => {
    // **Simulated API Call to update password**
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Password updated successfully:", data.newPassword);
        setSuccess(true); // Setting success state here
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Set New Password
        </h2>

        {success ? (
          <div className="text-center">
            <p className="text-xl text-lime-400 font-semibold mb-4">
              ✅ Success! Your password has been updated.
            </p>
            <p className="text-slate-300">
              You can now log in with your new password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-sm text-center text-slate-400">
              Choose a strong password with at least 8 characters.
            </p>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword")}
                disabled={isSubmitting}
                placeholder="Enter new password"
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out
    ${
      errors.newPassword
        ? "border-2 border-red-500" // Error: only shows red border
        : "border-2 border-slate-600 focus:border-slate-600" // Default: keeps border-2, removes focus ring and keeps border color on focus
    }`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                disabled={isSubmitting}
                placeholder="Confirm new password"
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out
    ${
      errors.confirmPassword
        ? "border-2 border-red-500" // Error: only shows red border
        : "border-2 border-slate-600 focus:border-slate-600" // Default: keeps border-2, removes focus ring and keeps border color on focus
    }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              // RHF handles validation and sets isSubmitting for the disabled state
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ease-in-out bg-lime-500 text-slate-900 hover:bg-lime-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Set Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SetNewPassword;
