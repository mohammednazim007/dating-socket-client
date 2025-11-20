"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { signInSchema, SignInFormData } from "@/app/lib/schemas/authSchemas";
import { useLoginMutation } from "@/app/redux/features/authApi/authApi";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import Cookies from "js-cookie";
import { AnimatePresence } from "motion/react";
import { Eye, EyeOff, Mail, Lock, CheckCircle2 } from "lucide-react";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const rememberedEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("rememberedEmail")
      : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: rememberedEmail || "",
      password: "",
    },
  });

  // ✅ Handle Sign-in
  const onSubmit = async (data: SignInFormData) => {
    try {
      // Save email before login
      if (rememberMe) localStorage.setItem("rememberedEmail", data.email);
      else localStorage.removeItem("rememberedEmail");

      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // Save token in cookie
      Cookies.set("accessToken", response.accessToken);

      console.log("response ", response);

      if (response.success === true) return router.push("/");
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setError("root", {
        message: apiError.data?.message || "Login failed",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center relative bg-slate-950 text-slate-200 px-4 selection:bg-indigo-500/30 selection:text-indigo-200"
    >
      <BackgroundGradient />

      <div className="w-full max-w-md z-10">
        {/* Card Container */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top Decoration Line */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2 border border-indigo-500/20">
                <Lock className="w-6 h-6" />
              </div>

              <p className="mt-2 text-slate-400 text-sm">
                Enter your credentials to access your workspace.
              </p>
            </div>

            {/* Error Alert */}
            <AnimatePresence>
              {errors.root && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm mb-4">
                  {errors.root.message}
                </div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300 ml-1"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    className={`w-full pl-10 pr-4 px-4 py-2 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 border transition-all duration-200 outline-none
                      ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                          : "border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-700"
                      }
                    `}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs ml-1 animate-pulse">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <Link
                    href="/auth/reset-password"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 px-4 py-2 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 border transition-all duration-200 outline-none
                      ${
                        errors.password
                          ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                          : "border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-700"
                      }
                    `}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs ml-1 animate-pulse">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="relative flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div
                    className={`
                    w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center
                    ${
                      rememberMe
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-slate-600 bg-slate-800/50 group-hover:border-slate-500"
                    }
                  `}
                  >
                    {rememberMe && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none">
                    Remember this device
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <ButtonIndicator width={10} height={10} />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                {`Don't have an account?`}
                <Link
                  href="/auth/signup"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  create a free account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInPage;
