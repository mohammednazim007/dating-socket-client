import { motion } from "motion/react";
import { IFriend } from "@/app/types/friend.types";
import UserProfile from "./User-profile";
import { useAppSelector } from "@/app/hooks/hooks";

interface HeaderAreaProps {
  onToggleSidebar: () => void;
  selectedFriends: IFriend | null;
}

const HeaderArea = ({ onToggleSidebar, selectedFriends }: HeaderAreaProps) => {
  const { activeUser } = useAppSelector((state) => state.friend);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-2 pl-6 border-b border-slate-700 bg-slate-800 shadow-md"
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
          <UserProfile currentUser={activeUser} isTimeAvailable={true} />
        </div>
      </div>
      <button className="p-2 rounded-lg hover:bg-slate-700 transition">
        ⋮
      </button>
    </motion.div>
  );
};

export default HeaderArea;
