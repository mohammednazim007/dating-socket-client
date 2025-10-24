"use client";

import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import PendingButton from "../PendingButton/PendingButton";
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

interface UserActionProps {
  user: User;
}

const UserActionButtons = ({ user }: UserActionProps) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { refetch } = useGetFriendsQuery(); // 👈 re-fetch manually if needed

  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectFriendRequestMutation();

  if (!currentUser) return null;

  // ---- RELATIONSHIP STATES ----
  const isFriend =
    currentUser.friends?.includes(user._id) &&
    user.friends?.includes(currentUser._id);

  const currentUserSentRequest = currentUser.sentRequests?.includes(user._id);
  const currentUserReceivedRequest = currentUser.friendRequests?.includes(
    user._id
  );
  console.log("current user send request", currentUserSentRequest);
  console.log("isFriend", isFriend);
  console.log("receive", currentUserReceivedRequest);
  console.log("user", currentUser);

  // ---- HANDLERS ----
  const handleAddFriend = async (receiverId: string) => {
    try {
      await addFriend({ senderId: currentUser._id, receiverId }).unwrap();
      toast.success("✅ Friend request sent");
      refetch(); // 👈 ensures UI updates
    } catch {
      toast.error("❌ Failed to send request");
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      toast.success("🗑️ Friend removed or request cancelled");
      refetch();
    } catch {
      toast.error("❌ Failed to remove friend");
    }
  };

  const handleAcceptRequest = async (senderId: string) => {
    try {
      await acceptRequest({ senderId, receiverId: currentUser._id }).unwrap();
      toast.success("🎉 Friend request accepted");
      refetch();
    } catch {
      toast.error("❌ Failed to accept request");
    }
  };

  const handleRejectRequest = async (senderId: string) => {
    try {
      await rejectRequest({ senderId, receiverId: currentUser._id }).unwrap();
      toast.success("🚫 Friend request rejected");
      refetch();
    } catch {
      toast.error("❌ Failed to reject request");
    }
  };

  // ---- CONDITIONAL BUTTON RENDERING ----

  if (isFriend)
    return (
      <CancelButton
        userId={user._id}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );

  if (currentUserSentRequest) return <PendingButton />;

  if (currentUserReceivedRequest)
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleAcceptRequest(user._id)}
          disabled={isAccepting}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isAccepting ? "Accepting..." : "Confirm"}
        </button>
        <button
          onClick={() => handleRejectRequest(user._id)}
          disabled={isRejecting}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          {isRejecting ? "Rejecting..." : "Delete"}
        </button>
      </div>
    );

  return (
    <AddButton
      userId={user._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;
