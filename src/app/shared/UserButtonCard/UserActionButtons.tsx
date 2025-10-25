"use client";

import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useGetFriendsQuery,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface UserActionProps {
  friendUser: User;
}

const UserActionButtons = ({ friendUser }: UserActionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { refetch } = useGetFriendsQuery(); // 👈 re-fetch manually if needed

  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectFriendRequestMutation();

  if (!currentUser) return null;

  // ---- HANDLERS ----
  const handleAddFriend = async (receiverId: string) => {
    try {
      await addFriend({
        senderId: currentUser._id,
        receiverId,
      }).unwrap();

      toast.success("✅ Friend request sent");
      refetch(); // 👈 ensures UI updates
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "❌ Failed to send friend request"
      );
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      toast.success("🗑️ Friend removed or request cancelled");
      // refetch();
    } catch {
      toast.error("❌ Failed to remove friend");
    }
  };

  const handleAcceptRequest = async (senderId: string) => {
    try {
      await acceptRequest({ senderId, receiverId: currentUser._id }).unwrap();
      toast.success("🎉 Friend request accepted");
      // refetch();
    } catch {
      toast.error("❌ Failed to accept request");
    }
  };

  const handleRejectRequest = async (senderId: string) => {
    try {
      await rejectRequest({ senderId, receiverId: currentUser._id }).unwrap();
      toast.success("🚫 Friend request rejected");
      // refetch();
    } catch {
      toast.error("❌ Failed to reject request");
    }
  };

  // ---- RELATIONSHIP STATES ----
  const isFriend =
    currentUser.sentRequests?.includes(friendUser._id) &&
    friendUser.sentRequests?.includes(currentUser._id);

  const currentUserSentRequest = currentUser.sentRequests?.includes(
    friendUser._id
  );
  const currentUserReceivedRequest = currentUser.friendRequests?.includes(
    friendUser._id
  );

  // ---- CONDITIONAL BUTTON RENDERING ----

  if (isFriend)
    return (
      <CancelButton
        userId={friendUser._id}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );

  if (currentUserReceivedRequest)
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleAcceptRequest(friendUser._id)}
          disabled={isAccepting}
          className="px-3 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition text-xs"
        >
          {isAccepting ? "Accepting..." : "Confirm"}
        </button>
        <button
          onClick={() => handleRejectRequest(friendUser._id)}
          disabled={isRejecting}
          className=" bg-gray-300 text-gray-800 rounded-ms hover:bg-gray-400 transition text-sx px-3 py-1 rounded-sm text-xs"
        >
          {isRejecting ? "Rejecting..." : "Cancel"}
        </button>
      </div>
    );

  return (
    <AddButton
      userId={friendUser._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;
