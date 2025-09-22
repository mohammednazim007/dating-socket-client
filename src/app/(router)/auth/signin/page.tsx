"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signInSchema, SignInFormData } from "@/app/lib/schemas/authSchemas";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/app/lib/axios";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setUser } from "@/app/redux/features/auth/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

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

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        router.push(redirect);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Or{" "}
            <Link
              href="/auth/signup"
              className="text-indigo-500 hover:text-indigo-400"
            >
              create a new account
            </Link>
          </p>
        </div>

        {errors.root && (
          <div className="bg-red-100 bg-opacity-20 p-3 rounded text-red-600 text-sm mb-2">
            {errors.root.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="text-sm text-gray-200">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              autoComplete="on"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-lg 
    focus:outline-none focus:ring-1 placeholder-gray-400 
    focus:ring-indigo-500 focus:border-indigo-500 pr-10 
    bg-gray-800 
    ${errors.email ? "border-red-500" : "border-gray-600"}`}
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-200">
              Password
            </label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-200 placeholder-gray-400 focus:border-indigo-500 pr-10 ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-200">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-500 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm text-indigo-500 hover:text-indigo-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
