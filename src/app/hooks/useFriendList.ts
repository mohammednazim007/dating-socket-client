import { useEffect, useState } from "react";
import api from "../lib/axios";
import { IFriend } from "../types/friend.types";

const useFriendListUser = (userId: string) => {
  const [activeFriendUsers, setActiveFriendUsers] = useState<IFriend[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/related-friends/${userId}`);

        if (res.status === 200) {
          setActiveFriendUsers(res?.data?.relatedFriend);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { activeFriendUsers, isLoading };
};

export default useFriendListUser;
