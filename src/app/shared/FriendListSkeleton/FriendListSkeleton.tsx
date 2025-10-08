import React from "react";

interface FriendListSkeletonProps {
  count: number;
}

const FriendListSkeleton = ({ count = 1 }: FriendListSkeletonProps) => {
  // Create an array to map over for the specified count
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-lg animate-pulse"
        >
          <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />

          <div className="flex flex-col justify-center">
            <div className="h-4 bg-gray-700 rounded w-24 mb-1 sm:w-32" />

            <div className="h-3 bg-gray-700 rounded w-16" />
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendListSkeleton;
