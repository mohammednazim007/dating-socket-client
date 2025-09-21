/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import React, { useRef, useState } from "react";
import avatar from "@/app/assets/profile.png";
import { FaCamera, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "@/app/lib/axios";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setUser } from "@/app/redux/features/auth/userSlice";
import { RootState } from "@/app/redux/store";

// ✅ Types
interface ProfileFormValues {
  name: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  image: File | null;
}

// ✅ Yup Schema
const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  currentPassword: Yup.string(),
  newPassword: Yup.string().when("currentPassword", {
    is: (val: string | undefined) => !!val && val.length > 0, // ✅ handle undefined
    then: (schema) =>
      schema
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
    otherwise: (schema) => schema,
  }),
  confirmPassword: Yup.string().when("newPassword", {
    is: (val: string | undefined) => !!val && val.length > 0,
    then: (schema) =>
      schema
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    otherwise: (schema) => schema,
  }),
});

const Profile = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  // local preview state for image
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial values
  const initialValues: ProfileFormValues = {
    name: currentUser?.user?.name || "Alexandra Collins",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    image: null,
  };

  // Image selection handler (outside Formik because of preview)
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setProfileImage(URL.createObjectURL(file)); // ✅ preview
    }
  };

  // Form submission handler
  const handleSubmit = async (
    values: ProfileFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("password", values.currentPassword);
      if (values.image) {
        formData.append("image", values.image);
      }

      // const updated = await api.put("/user/profile", formData);
      // dispatch(setUser(updated.data));

      console.log("Profile updated:", values);
      resetForm();
    } catch (error: any) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Account Settings
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your profile, password, and account details.
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Formik
              initialValues={initialValues}
              validationSchema={profileSchema}
              onSubmit={handleSubmit}
              validateOnChange={true} // default
              validateOnBlur={true} // default
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="flex flex-col md:flex-row" noValidate>
                  {/* Left Side: Profile Picture */}
                  <div className="w-full md:w-1/3 p-6 md:p-8 bg-slate-100/50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center justify-center">
                    <div className="relative group w-32 h-32 md:w-40 md:h-40 mb-4">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile Preview"
                          className="rounded-full w-full h-full border-4 border-white shadow-md"
                        />
                      ) : (
                        <Image
                          width={500}
                          height={500}
                          src={avatar.src}
                          alt="Profile"
                          className="rounded-full w-full h-full border-4 border-white shadow-md"
                        />
                      )}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 rounded-full bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300"
                      >
                        <FaCamera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      className="font-semibold text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      Change Photo
                    </button>
                    <p className="text-xs text-slate-500 mt-2">
                      JPG, or PNG. 1MB max.
                    </p>
                  </div>

                  {/* Right Side: Form Fields */}
                  <div className="w-full md:w-2/3 p-6 md:p-8">
                    <div className="space-y-6">
                      {/* --- Personal Information Section --- */}
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          Personal Information
                        </h2>
                        <div className="mt-4 space-y-4">
                          {/* Full Name */}
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-slate-600 mb-1"
                            >
                              Full Name
                            </label>
                            <div className="relative">
                              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Field
                                type="text"
                                id="name"
                                name="name"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Your full name"
                              />
                            </div>
                            <ErrorMessage
                              name="name"
                              component="p"
                              className="text-xs text-red-600 mt-1"
                            />
                          </div>

                          {/* Email (read-only) */}
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-slate-600 mb-1"
                            >
                              Email Address
                            </label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="email"
                                id="email"
                                value={currentUser?.user?.email || ""}
                                readOnly
                                className="w-full pl-10 pr-4 py-2 border rounded-lg border-slate-300 bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="border-slate-200" />

                      {/* --- Change Password Section --- */}
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          Change Password
                        </h2>
                        <div className="mt-4 space-y-4">
                          {/* Current Password */}
                          <div>
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-slate-600 mb-1"
                            >
                              Current Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Field
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="••••••••"
                              />
                            </div>
                            <ErrorMessage
                              name="currentPassword"
                              component="p"
                              className="text-xs text-red-600 mt-1"
                            />
                          </div>

                          {/* New Password */}
                          <div>
                            <label
                              htmlFor="newPassword"
                              className="block text-sm font-medium text-slate-600 mb-1"
                            >
                              New Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Field
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="••••••••"
                              />
                            </div>
                            <ErrorMessage
                              name="newPassword"
                              component="p"
                              className="text-xs text-red-600 mt-1"
                            />
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-slate-600 mb-1"
                            >
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="••••••••"
                              />
                            </div>
                            <ErrorMessage
                              name="confirmPassword"
                              component="p"
                              className="text-xs text-red-600 mt-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* --- Action Buttons --- */}
                      <div className="flex justify-end gap-4 pt-4">
                        <button
                          type="button"
                          className="px-6 py-2 rounded-lg text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all"
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
