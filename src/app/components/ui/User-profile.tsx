import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/auth";
interface UserProfileProps {
  currentUser: User | null;
  isDisable?: boolean;
}

const UserProfile = ({ currentUser, isDisable }: UserProfileProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/profile")}
      className="flex justify-center gap-1 cursor-pointer"
    >
      <button
        disabled={isDisable}
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
          src={currentUser?.image || avatar.src}
          alt={currentUser?.name || "User Avatar"}
          className="w-full h-full object-cover"
        />
      </button>
      <span>
        <h4 className="truncate capitalize">mohammed nazim</h4>
        <p className="text-xs text-gray-400">View Profile</p>
      </span>
    </div>
  );
};

export default UserProfile;
