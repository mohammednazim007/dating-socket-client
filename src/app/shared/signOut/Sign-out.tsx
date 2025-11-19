"use client";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "motion/react";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import toast from "react-hot-toast";
import { useState } from "react";
import Cookies from "js-cookie";

const SignOutButton = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  // ** sign out handler
  const signOutHandler = () => {
    setLoading(true);

    try {
      // ✅ Remove the accessToken cookie
      Cookies.remove("accessToken");

      toast.success("Signed out successfully!");
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
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
