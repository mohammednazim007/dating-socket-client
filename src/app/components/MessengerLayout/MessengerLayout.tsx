import Sidebar from "../ui/Sidebar";
import ChatArea from "../ui/ChatArea";

const MessengerLayout = () => {
  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default MessengerLayout;
