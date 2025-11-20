import { User } from "@/app/types/auth";
import { useMemo } from "react";

export const useFilteredFriends = (
  friends: User[] | undefined,
  searchTerm: string
) => {
  // Use useMemo to recalculate ONLY when friends or searchTerm changes
  return useMemo(() => {
    if (!friends) return [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    // Return all friends if the search term is empty
    if (!normalizedSearch) {
      return friends;
    }

    // Filter by name or email (or any other relevant field)
    return friends.filter((friend) => {
      const nameMatch = friend.name?.toLowerCase().includes(normalizedSearch);
      const emailMatch = friend.email?.toLowerCase().includes(normalizedSearch);
      return nameMatch || emailMatch;
    });
  }, [friends, searchTerm]);
};
