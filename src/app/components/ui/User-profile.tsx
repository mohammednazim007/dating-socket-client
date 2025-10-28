import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { User } from "@/app/types/auth";
import { formatLastSeenTime } from "@/app/utility/formatLastSeenTime";

interface UserProfileProps {
  currentUser: User | null;
  isTimeAvailable: boolean;
}

const UserProfile = ({ currentUser, isTimeAvailable }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg cursor-pointer py-2">
      {/* Avatar Section */}
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500/80 flex-shrink-0">
        <Image
          width={48}
          height={48}
          priority={true}
          src={currentUser?.avatar || avatar.src}
          alt={currentUser?.name || "User Avatar"}
        />
      </div>

      {/* Name and Status/Time Section */}
      <div className="flex flex-col justify-center">
        <h4 className="text-white text-md font-semibold truncate max-w-[150px] sm:max-w-[200px] capitalize">
          {currentUser?.name || "Unknown User"}
        </h4>

        <p
          className={`text-xs ${
            // If time is available (isTimeAvailable is true), use gray.
            // If time is NOT available (isTimeAvailable is false), use blue/primary color.
            isTimeAvailable ? "text-gray-400" : "text-blue-400 font-medium"
          }`}
        >
          {isTimeAvailable
            ? formatLastSeenTime(`${currentUser?.lastActive}`)
            : "Online"}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
