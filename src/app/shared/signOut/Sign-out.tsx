"use client";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "motion/react";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { useLogoutMutation } from "@/app/redux/features/authApi/authApi";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  // ** sign out handler
  const signOutHandler = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      toast.error(apiError.data?.message || "Logout failed");
    }
  };

  return (
    <motion.button
      onClick={signOutHandler}
      type="button"
      disabled={isLoading}
      className={`flex text-sm items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-300 ${
        isLoading ? "cursor-not-allowed bg-gray-500" : ""
      }`}
    >
      {isLoading ? (
        <ButtonIndicator width={5} height={5} />
      ) : (
        <>
          <IoMdLogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </>
      )}
    </motion.button>
  );
};

export default SignOutButton;
