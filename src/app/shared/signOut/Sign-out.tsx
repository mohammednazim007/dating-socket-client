"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "motion/react";
import { debounce } from "@/app/utility/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { useLogoutMutation } from "@/app/redux/features/authApi/authApi";

const SignOutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // ** sign out handler
  const signOutHandler = useCallback(async () => {
    try {
      await logout();
      router.push(redirect);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [dispatch, router, redirect]);

  // ** Debounce sigh out FN
  const debouncedSignOut = useMemo(
    () => debounce(signOutHandler, 500),
    [signOutHandler]
  );

  // ** Cleanup debounce
  useEffect(() => debouncedSignOut.cancel(), [debouncedSignOut]);

  return (
    <motion.button
      onClick={debouncedSignOut}
      type="button"
      disabled={isLoading}
      className={`flex text-sm items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-300 ${
        isLoading ? "cursor-not-allowed bg-gray-500" : ""
      }`}
    >
      {isLoading ? (
        <ButtonIndicator />
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
