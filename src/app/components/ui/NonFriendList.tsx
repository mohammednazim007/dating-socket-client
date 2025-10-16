"use client";

interface NonFriendListProps {
  currentUserId: string | undefined;
  onAddFriend: (user: any) => void;
}

const dummyUsers = [
  {
    _id: "68f0dcf875b5c41732fa20b5",
    name: "Mohammed Nazim",
    email: "mohammednazim3629@gmail.com",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615699/uploads/rmxhvszscpdbmsfdzrqt.jpg",
    lastActive: "2025-10-16T11:54:32.256Z",
  },
  {
    _id: "68f0dcf875b5c41732fa20b6",
    name: "John Doe",
    email: "johndoe@example.com",
    avatar:
      "https://res.cloudinary.com/dpelhoupo/image/upload/v1760615699/uploads/rmxhvszscpdbmsfdzrqt.jpg",
    lastActive: "2025-10-16T12:00:00.000Z",
  },
];

const NonFriendList = ({ currentUserId, onAddFriend }: NonFriendListProps) => {
  const nonFriends = dummyUsers.filter((u) => u._id !== currentUserId);

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      {nonFriends.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center p-3 rounded-md hover:bg-slate-700 active:bg-slate-600 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">
                Last active: {new Date(user.lastActive).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => onAddFriend(user)}
            className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 active:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default NonFriendList;
