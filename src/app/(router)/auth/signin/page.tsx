"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "@/app/lib/axios";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setUser } from "@/app/redux/features/auth/userSlice";
import { signInSchema, SignInFormData } from "@/app/lib/schemas/authSchemas";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        "/user/login",
        { email: data.email, password: data.password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("login response:", response);

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        router.push("/");
      }
    } catch (err: any) {
      const fields = err.response?.data?.fields;
      if (fields?.length) {
        fields.forEach((f: { field: string; message: string }) =>
          setError(f.field as keyof SignInFormData, { message: f.message })
        );
      } else {
        setError("root", {
          message: err.response?.data?.message || "Something went wrong",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-800 text-slate-100 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Sign in</h2>
          <p className="mt-2 text-sm text-slate-400">
            Or{" "}
            <Link
              href="/auth/signup"
              className="text-indigo-400 hover:text-indigo-300"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Error Alert */}
        {errors.root && (
          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm mb-4">
            {errors.root.message}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="on"
              className={`w-full px-3 py-2 border rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-slate-700"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10 ${
                  errors.password ? "border-red-500" : "border-slate-700"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-300">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-500 border-slate-600 bg-slate-700 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInPage;
