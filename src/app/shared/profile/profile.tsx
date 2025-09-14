/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { FormErrors, profileSchema } from "@/app/lib/schemas/authSchemas";
import Image from "next/image";
import React, { useState, useRef } from "react";
import avatar from "@/app/assets/profile.png";
import { FaCamera, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "@/app/lib/axios";

// Main Profile Page Component
const Profile = () => {
  // State for user data
  const [name, setName] = useState<string>("Alexandra Collins");
  const [email, setEmail] = useState<string>("alexandra.collins@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // State for password fields
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
      setProfileImage(URL.createObjectURL(file)); // ✅ preview fix
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission with Zod validation
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);

    const result = profileSchema.safeParse({
      name,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
      image,
    });

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    // Build FormData for backend (including file if exists)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("currentPassword", currentPassword);

    if (image) {
      formData.append("image", image); // ✅ safe only if image exists
    }

    try {
      const updated = await api.put("/user/profile", formData);

      console.log("Profile updated:", updated.data);
    } catch (error: any) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }

    // Reset password fields after submission for security
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row"
              noValidate
            >
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
                    onClick={handleImageUploadClick}
                    className="absolute inset-0 rounded-full bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center cursor-pointer transition-all duration-300"
                  >
                    <FaCamera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={handleImageUploadClick}
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
                      {/* Full Name Input */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-600 mb-1"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors?.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                            placeholder="Your full name"
                          />
                        </div>
                        {errors?.name && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.name._errors[0]}
                          </p>
                        )}
                      </div>
                      {/* Email Input */}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors?.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                            placeholder="your@email.com"
                          />
                        </div>
                        {errors?.email && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.email._errors[0]}
                          </p>
                        )}
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
                          htmlFor="current-password"
                          className="block text-sm font-medium text-slate-600 mb-1"
                        >
                          Current Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors?.currentPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors?.currentPassword && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.currentPassword._errors[0]}
                          </p>
                        )}
                      </div>
                      {/* New Password */}
                      <div>
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium text-slate-600 mb-1"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors?.newPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors?.newPassword && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.newPassword._errors[0]}
                          </p>
                        )}
                      </div>
                      {/* Confirm New Password */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium text-slate-600 mb-1"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              errors?.confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                            }`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors?.confirmPassword && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.confirmPassword._errors[0]}
                          </p>
                        )}
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
                      className="px-6 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
