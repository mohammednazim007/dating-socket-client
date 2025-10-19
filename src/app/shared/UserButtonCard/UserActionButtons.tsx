import { User } from "@/app/types/auth";
import CancelButton from "../CancelButton/CancelButton";
import PendingButton from "../PendingButton/PendingButton";
import AddButton from "../AddButton/AddButton";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "@/app/redux/features/friends/friendApi";
import toast from "react-hot-toast";

interface UserAction {
  user: User;
}

const UserActionButtons = ({ user }: UserAction) => {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [addFriend, { isLoading: isAdding }] = useAddFriendMutation();
  const [removeFriend, { isLoading: isRemoving }] = useRemoveFriendMutation();

  if (!currentUser) return null;

  // --- RELATIONSHIP LOGIC ---
  const isFriend = currentUser.friends?.includes(user._id) ?? false;
  const isPending =
    currentUser.sentRequests?.includes(user._id) ||
    user.friendRequests?.includes(currentUser._id);

  // ---ADD FRIEND HANDLERS  ---
  const handleAddFriend = async (receiverId: string) => {
    try {
      await addFriend({ senderId: currentUser._id, receiverId }).unwrap();
      toast.success("✅ Friend request sent");
    } catch (err) {
      toast.error("❌ Failed to send request:");
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      console.log("🗑️ Friend removed");
    } catch (err) {
      console.error("❌ Failed to remove friend:", err);
    }
  };

  // --- BUTTON STYLES ---

  // --- CONDITIONAL RENDER ---
  if (isFriend) {
    return (
      <CancelButton
        userId={user._id}
        onClick={handleRemoveFriend}
        isLoading={isRemoving}
      />
    );
  }

  if (isPending) {
    return <PendingButton />;
  }

  return (
    <AddButton
      userId={user._id}
      onClick={handleAddFriend}
      isLoading={isAdding}
    />
  );
};

export default UserActionButtons;
