"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import avatar from "@/app/assets/profile.png";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import api from "@/app/lib/axios";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setUser } from "@/app/redux/features/auth/userSlice";
import { RootState } from "@/app/redux/store";
import { profileSchema } from "./schema";
import SignOutButton from "@/app/components/ui/Sign-out";
import { toast } from "react-hot-toast";
import { debounce } from "@/app/utility/debounce";

interface ProfileFormValues {
  name: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  image: File | null;
}

const Profile = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(
    currentUser?.user?.avatar || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔹 Track password visibility per field
  const [showPassword, setShowPassword] = useState<{
    [key: string]: boolean;
  }>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const initialValues: ProfileFormValues = {
    name: currentUser?.user?.name || "Alexandra Collins",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    image: null,
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // 1. Define the core, non-debounced submission logic using useCallback.
  const submitLogic = useCallback(
    async (
      values: ProfileFormValues,
      { resetForm }: { resetForm: () => void }
    ) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);

        if (values.currentPassword && values.newPassword) {
          formData.append("currentPassword", values.currentPassword);
          formData.append("newPassword", values.newPassword);
        }

        if (values.image) {
          formData.append("image", values.image);
        }

        const response = await api.post("/user/profile", formData);

        if (response.status === 200) {
          toast.success("Profile updated successfully!");
          dispatch(setUser(response.data.user));
          resetForm();
          window.location.reload(); // Reload to reflect changes
          // Use router.refresh()
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to update profile. Please try again.";
        toast.error(errorMessage);
      }
    },
    [dispatch, router] // Dependencies
  );

  const debouncedSubmit = useMemo(
    () => debounce(submitLogic, 5000),
    [submitLogic]
  );

  // 3. Cleanup: Ensure any pending submission is cancelled when the component unmounts.
  useEffect(() => debouncedSubmit.cancel(), [debouncedSubmit]);

  return (
    <div className="bg-[#0f172a] flex items-center justify-center px-4 py-8 font-sans text-slate-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        {/* Header with Back Button */}
        <div className="flex items-center mb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* Profile Card (Dark Mode) */}
        <div className="bg-slate-800 text-slate-100 rounded-2xl shadow-2xl overflow-hidden">
          <Formik
            initialValues={initialValues}
            validationSchema={profileSchema}
            onSubmit={debouncedSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col md:flex-row" noValidate>
                {/* Left: Avatar */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full md:w-1/3 p-2 md:p-4 bg-slate-700 flex flex-col items-center "
                >
                  <div className="relative group w-32 h-32 md:w-40 md:h-40 mb-4">
                    {profileImage ? (
                      <Image
                        width={500}
                        height={500}
                        src={profileImage}
                        priority={true}
                        alt="Profile Preview"
                        className="rounded-full w-full h-full border-4 border-slate-700 shadow-md object-cover"
                      />
                    ) : (
                      <Image
                        width={500}
                        height={500}
                        priority={true}
                        src={avatar.src}
                        alt="Profile"
                        className="rounded-full w-full h-full border-4 border-slate-700 shadow-md object-cover"
                      />
                    )}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-300"
                    >
                      <FaCamera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-semibold text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Change Photo
                  </button>
                  <p className="text-xs text-slate-500 mt-2">
                    JPG, PNG up to 1MB
                  </p>
                </motion.div>

                {/* Right: Form */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="w-full md:w-2/3 p-6 md:p-8"
                >
                  <h1 className="text-2xl font-bold text-white mb-6">
                    Account Settings
                  </h1>

                  {/* Personal Info */}
                  <h2 className="text-lg font-semibold text-slate-200 mb-3">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <Field
                          type="text"
                          name="name"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-900 text-white border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-xs text-red-400 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="email"
                          value={currentUser?.user?.email || ""}
                          readOnly
                          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-900 text-slate-400 border-slate-700 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-700" />

                  {/* Password */}
                  <h2 className="text-lg font-semibold text-slate-200 mb-3">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    {["currentPassword", "newPassword", "confirmPassword"].map(
                      (field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-slate-400 mb-1">
                            {field === "currentPassword"
                              ? "Current Password"
                              : field === "newPassword"
                              ? "New Password"
                              : "Confirm Password"}
                          </label>
                          <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <Field
                              type={showPassword[field] ? "text" : "password"}
                              name={field}
                              placeholder="••••••••"
                              className="w-full pl-10 pr-10 py-2 border rounded-lg bg-slate-900 text-white border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(field)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                            >
                              {showPassword[field] ? (
                                <FaEyeSlash className="w-5 h-5" />
                              ) : (
                                <FaEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name={field}
                            component="p"
                            className="text-xs text-red-400 mt-1"
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <SignOutButton />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </motion.div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
