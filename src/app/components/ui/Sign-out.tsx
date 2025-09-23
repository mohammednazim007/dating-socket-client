"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import api from "@/app/lib/axios";
import { clearUser } from "@/app/redux/features/auth/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "motion/react";

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const signOutHandler = async () => {
    try {
      const signOut = await api.get("/user/logout");
      if (signOut.status === 200) {
        dispatch(clearUser());
        router.push(redirect);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.button
      onClick={signOutHandler}
      type="button"
      className="flex text-sm items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-300"
    >
      <IoMdLogOut className="w-5 h-5" />
      <span>Sign Out</span>
    </motion.button>
  );
};

export default SignOutButton;
