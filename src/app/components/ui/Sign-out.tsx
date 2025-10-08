"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import api from "@/app/lib/axios";
import { clearUser } from "@/app/redux/features/auth/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";
import { motion } from "motion/react";
import { debounce } from "@/app/utility/debounce";
import { useCallback, useEffect, useMemo } from "react";

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // ** sign out handler
  const signOutHandler = useCallback(async () => {
    try {
      const signOut = await api.get("/user/logout");

      if (signOut.status === 200) {
        dispatch(clearUser());
        router.push(redirect);
      }
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
      className="flex text-sm items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-300"
    >
      <IoMdLogOut className="w-5 h-5" />
      <span>Sign Out</span>
    </motion.button>
  );
};

export default SignOutButton;
