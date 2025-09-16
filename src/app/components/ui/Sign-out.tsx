"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import api from "@/app/lib/axios";
import { clearUser } from "@/app/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOutHandler = async () => {
    const signOut = await api.get("/user/logout");

    if (signOut.status === 200) {
      //   console.log("You have been successfully signed out");

      dispatch(clearUser());
      router.push("/");
    }
  };

  return (
    <button
      onClick={() => signOutHandler()}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
    >
      <IoMdLogOut />
    </button>
  );
};

export default SignOutButton;
