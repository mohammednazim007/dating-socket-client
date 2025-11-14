"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import storageEmailLocalStorage from "@/app/utility/storeEmail";
import { useSendOtpMutation } from "@/app/redux/features/authApi/authApi";
import { useRouter } from "next/navigation";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/app/lib/schemas/resetPasswordSchema";

// Define the shape of the form data
type ResetFields = {
  email: string;
};

const ResetPassword: React.FC = () => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [rootError, setRootError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFields>({
    resolver: zodResolver(ResetSchema),
    mode: "onSubmit",
  });

  //** Handle form submission to send OTP for password reset
  const onSubmit: SubmitHandler<ResetFields> = async (data) => {
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) storageEmailLocalStorage(data.email, "add");

      // Send OTP for password reset
      const response = await sendOtp({ email: data.email }).unwrap();
      if (!response.success)
        throw new Error(response.message || "Failed to send OTP");

      router.push("/auth/verify-otp");
    } catch (err: any) {
      setRootError(err.message || "Failed to send OTP");
    }
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
          {/* Error Alert */}
          {rootError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm mb-4">
              {rootError}
            </div>
          )}
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
              disabled={isLoading}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out
    ${
      errors.email
        ? "border-2 border-red-500"
        : "border-2 border-slate-600 focus:border-slate-600"
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
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ease-in-out bg-lime-500 text-slate-900 hover:bg-lime-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed ${
              isLoading ? "cursor-not-allowed " : ""
            }`}
          >
            {isLoading ? (
              <ButtonIndicator width={11} height={11} />
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
