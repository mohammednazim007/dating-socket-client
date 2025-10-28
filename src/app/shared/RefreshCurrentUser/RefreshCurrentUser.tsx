"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { refreshUser } from "@/app/redux/features/auth/refreshUser";

export default function RefreshCurrentUser() {
  const dispatch = useAppDispatch();
  const dispatched = useRef(false);

  useEffect(() => {
    if (!dispatched.current) {
      dispatch(refreshUser());
      dispatched.current = true; // prevent multiple dispatches
    }
  }, [dispatch]);

  return null;
}
