"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetSchema } from "@/app/lib/schemas/resetPasswordSchema";

// Define the shape of the form data
type ResetFields = {
  email: string;
};

const ResetPassword: React.FC = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFields>({
    resolver: yupResolver(ResetSchema) as any,
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ResetFields> = (data) => {
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-sm text-center text-slate-400">
            Enter your email address and we'll send you a link or code to reset
            your password.
          </p>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              disabled={isSubmitting}
              placeholder="you@example.com"
              // Unified input styling: border-2, focus:outline-none, matching colors from SetNewPassword
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out
    ${
      errors.email
        ? "border-2 border-red-500" // Error: consistent 2px red border
        : "border-2 border-slate-600 focus:border-slate-600" // Default: consistent 2px gray border, removes focus ring
    }`}
            />

            {/* Display RHF error message */}
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ease-in-out bg-lime-500 text-slate-900 hover:bg-lime-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
