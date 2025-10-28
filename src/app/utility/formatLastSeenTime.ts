export const formatLastSeenTime = (
  dateString: string | undefined | null
): string => {
  // 1. Handle missing/invalid input
  if (!dateString) {
    return "Last seen long ago";
  }

  // 2. Convert the ISO string to a Date object.
  // This is the correct way to handle the string input.
  const dateObject = new Date(dateString);

  // Check for an invalid date (e.g., if the string format was wrong)
  if (isNaN(dateObject.getTime())) {
    return "Last seen N/A";
  }

  // 3. Define the formatter
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // 4. Return the final string.
  return `Last seen ${formatter.format(dateObject)}`;
};
