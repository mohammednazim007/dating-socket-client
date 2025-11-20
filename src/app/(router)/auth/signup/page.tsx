"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { signUpSchema, SignUpFormData } from "@/app/lib/schemas/authSchemas";
import { useRegisterUserMutation } from "@/app/redux/features/authApi/authApi";
import ButtonIndicator from "@/app/shared/buttonIndicator/ButtonIndicator";
import BackgroundGradient from "@/app/shared/BackgroundGradient/BackgroundGradient";

const SignUpPage = () => {
  const [show, setShow] = useState<Record<keyof SignUpFormData, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    avatar: false,
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // -------- FIELD CONFIG (STRONGLY TYPED) ----------
  const fields: Array<{
    label: string;
    name: keyof SignUpFormData;
    type: string;
    placeholder: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isPassword?: boolean;
  }> = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "John Doe",
      Icon: User,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "name@company.com",
      Icon: Mail,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Create a password",
      Icon: Lock,
      isPassword: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      Icon: Lock,
      isPassword: true,
    },
  ];

  // ---------- SUBMIT HANDLER ----------
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await registerUser({ ...data, avatar: "" }).unwrap();

      if (response.success === true) {
        router.push("/auth/signin");
      }
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setError("root", {
        message: apiError.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center relative bg-slate-950 text-slate-200 px-4 selection:bg-indigo-500/30"
    >
      <BackgroundGradient />

      <div className="w-full max-w-md z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />

          <div className="p-6">
            {/* HEADER */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-2 border border-indigo-500/20">
                <User className="w-6 h-6" />
              </div>
              <p className="mt-2 text-slate-400 text-sm">
                Create your account to get started.
              </p>
            </div>

            {/* ROOT ERROR */}
            {errors.root && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm mb-4">
                {errors.root.message}
              </div>
            )}

            {/* ------------ FORM START ------------ */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {f.label}
                  </label>

                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400">
                      <f.Icon className="w-5 h-5" />
                    </div>

                    <input
                      {...register(f.name)}
                      type={
                        f.isPassword
                          ? show[f.name]
                            ? "text"
                            : "password"
                          : f.type
                      }
                      placeholder={f.placeholder}
                      className={`w-full pl-10 pr-12 px-4 py-2 rounded-xl bg-slate-950/50 text-white placeholder-slate-600 border outline-none transition-all
                        ${
                          errors[f.name]
                            ? "border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                            : "border-slate-800 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-700"
                        }`}
                    />

                    {/* Password show/hide */}
                    {f.isPassword && (
                      <button
                        type="button"
                        onClick={() =>
                          setShow((prev) => ({
                            ...prev,
                            [f.name]: !prev[f.name],
                          }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800"
                      >
                        {show[f.name] ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>

                  {errors[f.name] && (
                    <p className="text-red-400 text-xs ml-1 mt-[4px]">
                      {errors[f.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}

              {/* TERMS CHECKBOX (same design as SignIn) */}
              <label className="relative flex items-center cursor-pointer group">
                <input type="checkbox" required className="peer sr-only" />

                <div
                  className={`
                    w-5 h-5 border-2 rounded-md transition-all flex items-center justify-center
                    border-slate-600 bg-slate-800/50 peer-checked:bg-indigo-600 peer-checked:border-indigo-600
                  `}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 text-white" />
                </div>

                <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <ButtonIndicator width={10} height={10} />
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* FOOTER */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
