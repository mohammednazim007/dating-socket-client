import { motion } from "motion/react";
import FriendsProfile from "./FriendsProfile";
import { IFriend } from "@/app/types/friend.types";

interface HeaderAreaProps {
  onToggleSidebar: () => void;
  selectedFriends: IFriend | null;
}

const HeaderArea = ({ onToggleSidebar, selectedFriends }: HeaderAreaProps) => {
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

        <FriendsProfile currentFriends={selectedFriends} isDisable={true} />
        <div>
          <p className="font-semibold text-white">
            {selectedFriends?.name || "Select a chat"}
          </p>
          <p className="text-xs text-slate-400">Last seen 10:20pm</p>
        </div>
      </div>
      <button className="p-2 rounded-lg hover:bg-slate-700 transition">
        ⋮
      </button>
    </motion.div>
  );
};

export default HeaderArea;
