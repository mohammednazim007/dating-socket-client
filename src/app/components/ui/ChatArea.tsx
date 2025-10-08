// "use client";
// import { useAppSelector } from "@/app/hooks/hooks";
// import MessageArea from "./Message-area";
// import InputArea from "./InputArea";
// import HeaderArea from "./HeaderArea";
// import NoChatSelected from "./NoChatSelected";

// interface ChatAreaProps {
//   onToggleSidebar: () => void;
// }

// const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
//   const { activeUser } = useAppSelector((state) => state.friend);

//   return (
//     <div className="flex flex-col h-full bg-[#0f172a] text-slate-100">
//       {/* Header */}
//       {
//         <HeaderArea
//           onToggleSidebar={onToggleSidebar}
//           selectedFriends={activeUser}
//         />
//       }

//       {/* Message area */}
//       <div className="flex-1 overflow-y-auto ">
//         {!activeUser ? (
//           <NoChatSelected /> // 👈 Show placeholder when no user selected
//         ) : (
//           <>
//             <MessageArea />
//           </>
//         )}
//       </div>

//       {/* Input area */}
//       <div></div>
//       {activeUser && <InputArea />}
//     </div>
//   );
// };

// export default ChatArea;
"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import MessageArea from "./Message-area";
import InputArea from "./InputArea";
import HeaderArea from "./HeaderArea";
import NoChatSelected from "./NoChatSelected";

interface ChatAreaProps {
  onToggleSidebar: () => void;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const { activeUser } = useAppSelector((state) => state.friend);

  return (
    // ✅ Full height flexible container
    <div className="flex flex-col flex-1 min-h-0 bg-[#0f172a] text-slate-100">
      {/* Header */}
      <HeaderArea
        onToggleSidebar={onToggleSidebar}
        selectedFriends={activeUser}
      />

      {/* ✅ Main scrollable section */}
      <div className="flex-1 min-h-0 flex flex-col">
        {!activeUser ? <NoChatSelected /> : <MessageArea />}
      </div>

      {/* Input area */}
      {activeUser && (
        <div className="flex-shrink-0">
          <InputArea />
        </div>
      )}
    </div>
  );
};

export default ChatArea;
