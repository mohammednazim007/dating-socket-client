"use client";
import { useMemo } from "react";
import { User } from "@/app/types/auth"; // ✅ Import your real User type

/**
 * Reusable hook for filtering a list of users/friends by search term.
 */
export function useFilteredFriends(
  friends: User[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    if (!friends) return [];
    if (!searchTerm.trim()) return friends;

    const q = searchTerm.toLowerCase();

    return friends.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q)
    );
  }, [friends, searchTerm]);
}
