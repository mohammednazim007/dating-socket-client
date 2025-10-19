// ----------------- HELPER -----------------
const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.MAX_SAFE_INTEGER, "year"],
  ];

  let counter = seconds;
  for (let i = 0; i < intervals.length; i++) {
    if (counter < intervals[i][0]) {
      const label = intervals[i - 1]?.[1] || "second";
      const value = Math.floor(counter);
      return value <= 1 ? `1 ${label} ago` : `${value} ${label}s ago`;
    }
    counter /= intervals[i][0];
  }
  return "a long time ago";
};
export default timeAgo;
