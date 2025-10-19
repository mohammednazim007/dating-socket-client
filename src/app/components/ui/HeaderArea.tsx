import { motion } from "motion/react";
import UserProfile from "./User-profile";
import { useAppSelector } from "@/app/hooks/hooks";
import FriendListSkeleton from "@/app/shared/FriendListSkeleton/FriendListSkeleton";
import Notification from "./Notification";

interface HeaderAreaProps {
  onToggleSidebar: () => void;
}

const HeaderArea = ({ onToggleSidebar }: HeaderAreaProps) => {
  const { activeUser } = useAppSelector((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-5 border-b border-slate-700 bg-slate-800 shadow-md"
    >
      <div className="flex items-center gap-3">
        {/* Mobile toggle button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
        >
          ☰
        </button>

        <div>
          {activeUser ? (
            <UserProfile currentUser={activeUser} isTimeAvailable={true} />
          ) : (
            <FriendListSkeleton count={1} />
          )}
        </div>
      </div>

      {/* Notification */}
      <Notification />
    </motion.div>
  );
};

export default HeaderArea;
