import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { useRouter } from "next/navigation";
import { IFriend } from "@/app/types/friend.types";

interface UserProfileProps {
  currentFriends: IFriend | null;
  isDisable?: boolean;
}

const FriendsProfile = ({ currentFriends, isDisable }: UserProfileProps) => {
  const router = useRouter();

  return (
    <button
      disabled={isDisable}
      onClick={() => router.push("/profile")}
      className={`w-10 h-10 rounded-full overflow-hidden border-2 border-white flex items-center justify-center 
      ${
        isDisable
          ? "bg-gray-400 cursor-not-allowed pointer-events-none"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      <Image
        width={40}
        height={40}
        src={currentFriends?.avatar || avatar.src}
        alt={currentFriends?.name || "User Avatar"}
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default FriendsProfile;
