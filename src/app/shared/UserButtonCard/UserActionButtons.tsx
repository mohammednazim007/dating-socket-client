"use client";
import { User } from "@/app/types/auth";
import AddButton from "../AddButton/AddButton";
import {
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useCancelFriendRequestMeMutation,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";
import { playSound } from "@/app/utility/playSound";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";
import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";

interface UserActionProps {
  friend: User;
}

const UserActionButtons = ({ friend }: UserActionProps) => {
  const { data: currentUser, refetch } = useCurrentUserQuery();

  const [sendFriendRequest, { isLoading: isAdding }] =
    useSendFriendRequestMutation();
  const [deleteFriendRequest, { isLoading: isRemoving }] =
    useDeleteFriendRequestMutation();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();
  const [cancelFriendRequestByMe, { isLoading: isCanceling }] =
    useCancelFriendRequestMeMutation();

  const user = currentUser?.user;
  if (!user) return null;

  // ---- RELATIONSHIP STATES ----
  const isRequestSent = user?.sentRequests?.includes(friend._id);
  const isRequestReceived = user?.friendRequests?.includes(friend._id);

  // ---- HANDLERS ----

  // * Send Friend Request
  const handleAddFriend = async (receiverId: string) => {
    try {
      await sendFriendRequest({
        senderId: user?._id,
        receiverId,
      }).unwrap();

      await refetch();
      playSound("success");
      toast.success("Friend request sent ✅");
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Failed to send request");
    }
  };

  // * Accept Friend Request
  const handleAcceptRequest = async (senderId: string) => {
    try {
      await acceptRequest({
        senderId,
        receiverId: user?._id,
      }).unwrap();

      playSound("success");
      toast.success("Friend request accepted 🎉");
    } catch {
      toast.error("❌ Failed to accept request");
    }
  };

  // * Cancel / Delete Friend Request
  const handleRemoveFriend = async (receiverId: string) => {
    try {
      await deleteFriendRequest(receiverId).unwrap();
      console.log("userId", user._id);
      console.log("friendId", friend._id, receiverId);

      await refetch();
      playSound("cancel");
      toast.success("Request cancelled 🚫");
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel request");
    }
  };

  // ** Cancel Friend Request by Me
  const handleCancelRequestByMe = async (friendId: string) => {
    try {
      await cancelFriendRequestByMe(friendId).unwrap();

      await refetch();
      playSound("cancel");
      toast.success("Request cancelled 🚫");
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel request");
    }
  };

  // ---- CONDITIONAL BUTTON RENDERING ----
  //** Cancel friend request by me
  if (isRequestSent)
    return (
      <button
        onClick={() => handleCancelRequestByMe(friend?._id)}
        disabled={isRemoving}
        className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition text-xs px-3 py-1 rounded-sm"
      >
        {isRemoving ? (
          <ButtonIndicator width={9} height={9} />
        ) : (
          "Cancel Request"
        )}
      </button>
    );

  // * Received Friend Request
  if (isRequestReceived)
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleAcceptRequest(friend._id)}
          disabled={isAccepting}
          className="text-xs px-3 py-1 rounded-sm bg-blue-600 text-white hover:bg-blue-700 transition "
        >
          {isAccepting ? <ButtonIndicator width={9} height={9} /> : "Confirm"}
        </button>
        <button
          onClick={() => handleRemoveFriend(friend._id)}
          disabled={isRemoving}
          className="text-xs px-3 py-1 rounded-sm bg-gray-300 text-gray-800  hover:bg-gray-400 transition "
        >
          {isRemoving ? <ButtonIndicator width={9} height={9} /> : "Cancel"}
        </button>
      </div>
    );

  // Default: show add friend button
  return (
    <AddButton
      userId={friend._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;
