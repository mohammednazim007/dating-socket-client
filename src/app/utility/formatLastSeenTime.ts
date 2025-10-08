export const formatLastSeenTime = (): string => {
  // 1. Get the current local date and time.
  const date = new Date();

  // 2. Use Intl.DateTimeFormat for locale-aware and efficient time formatting.
  // We use "en-US" to ensure the PM/AM format as requested.
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 12-hour format (e.g., 10:20 PM)
  });

  // 3. Construct the final string.
  return `Last seen ${formatter.format(date)}`;
};
