"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFields } from "@/app/types/auth";
import { PasswordSchema } from "@/app/lib/schemas/resetPasswordSchema";
import { useSetNewPasswordMutation } from "@/app/redux/features/authApi/authApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import storageEmailLocalStorage from "@/app/utility/storeEmail";

const ChangePassword: React.FC = () => {
  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();
  const router = useRouter();

  // ** Visibility state
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFields>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<PasswordFields> = async (data) => {
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        toast.error("Email not found. Please try again.");
        return;
      }

      const response = await setNewPassword({
        email,
        newPassword: data.newPassword,
      }).unwrap();

      if (response?.success) {
        toast.success("Password updated successfully.");
        router.push("/");
        storageEmailLocalStorage(email, "remove");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-sm text-center text-slate-400">
            Choose a strong password with at least 8 characters.
          </p>

          {/* 🔐 New Password Field */}
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword")}
                disabled={isSubmitting}
                placeholder="Enter new password"
                className={`w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out ${
                  errors.newPassword
                    ? "border-2 border-red-500"
                    : "border-2 border-slate-600 focus:border-slate-600"
                }`}
              />
              {/* 👁️ Toggle Button */}
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* 🔐 Confirm Password Field */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                disabled={isSubmitting}
                placeholder="Confirm new password"
                className={`w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none transition-colors duration-150 ease-in-out ${
                  errors.confirmPassword
                    ? "border-2 border-red-500"
                    : "border-2 border-slate-600 focus:border-slate-600"
                }`}
              />
              {/* 👁️ Toggle Button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isLoading}
            className="w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ease-in-out bg-lime-500 text-slate-900 hover:bg-lime-600 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <ButtonIndicator width={11} height={11} />
            ) : (
              "Set Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
