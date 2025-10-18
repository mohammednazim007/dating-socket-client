import { User } from "@/app/types/auth";

interface UserAction {
  user: User;
}

const UserActionButtons = ({ user }: UserAction) => {
  // 1. Define Common Button Classes (Smaller UI)
  const baseClasses =
    // p-1.5 for vertical padding, px-3 for horizontal
    // text-xs for small text
    "text-xs font-semibold py-1.5 px-3 rounded-md transition duration-200 ease-in-out";

  // Dummy handlers for now
  const onCancelFriendship = (userId: string) => {
    console.log(`Canceling friendship with: ${userId}`);
    // Actual API call/dispatch here
  };

  const onAddFriend = (userId: string) => {
    console.log(`Adding friend: ${userId}`);
    // Actual API call/dispatch here
  };

  return (
    <>
      {user.isFriend ? (
        // --- CANCEL/UNFRIEND BUTTON (Compact & Subtle) ---
        <button
          type="button"
          onClick={() => onCancelFriendship(user._id)}
          // Subtle, outline-style look: Gray background with a lighter border/focus ring
          className={`${baseClasses} border border-gray-400 text-gray-400 hover:bg-gray-700/50 focus:ring-gray-400 focus:ring-1`}
        >
          Cancel
        </button>
      ) : (
        // --- ADD BUTTON (Compact & Primary) ---
        <button
          type="button"
          onClick={() => onAddFriend(user._id)}
          // Primary color (Blue) but more compact. Subtle hover.
          className={`${baseClasses} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-1`}
        >
          Add
        </button>
      )}
    </>
  );
};

export default UserActionButtons;
