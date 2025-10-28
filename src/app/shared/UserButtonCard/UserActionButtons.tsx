"use client";

import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useGetFriendsQuery,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";

interface UserActionProps {
  friendUser: User;
}

const UserActionButtons = ({ friendUser }: UserActionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { refetch } = useGetFriendsQuery(); // ✅ get refetch function here

  const [sendFriendRequest, { isLoading: isAdding }] =
    useSendFriendRequestMutation();
  const [deleteFriendRequest, { isLoading: isRemoving }] =
    useDeleteFriendRequestMutation();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();

  if (!currentUser) return null;

  // ---- HANDLERS ----
  //* Add Friend Handler with receiverId
  const handleAddFriend = async (receiverId: string) => {
    try {
      const result = await sendFriendRequest({
        senderId: currentUser._id,
        receiverId,
      }).unwrap();

      toast.success("✅ Friend request sent");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Failed to send request");
    }
  };

  // * Accept Friend Request Handler with senderId
  const handleAcceptRequest = async (senderId: string) => {
    try {
      await acceptRequest({ senderId, receiverId: currentUser._id }).unwrap();
      toast.success("🎉 Friend request accepted");
    } catch {
      toast.error("❌ Failed to accept request");
    }
  };

  // ** Remove the friend request
  const handleRemoveFriend = async (receiverId: string) => {
    try {
      await deleteFriendRequest(receiverId).unwrap();
      toast.success("Request cancelled");
      await refetch(); // ✅ manually refetch the friends list
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel request");
    }
  };

  // ---- RELATIONSHIP STATES ----
  const isFriendRequest = currentUser.friendRequests?.includes(friendUser._id);

  // ---- CONDITIONAL BUTTON RENDERING ----
  if (isFriendRequest)
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
          onClick={() => handleRemoveFriend(friendUser._id)}
          disabled={isRemoving}
          className=" bg-gray-300 text-gray-800 rounded-ms hover:bg-gray-400 transition text-sx px-3 py-1 rounded-sm text-xs"
        >
          {isRemoving ? "Removing..." : "Cancel"}
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
