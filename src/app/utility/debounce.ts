/**
 * @param func The function to debounce.
 * @param delay The number of milliseconds to delay.
 * @returns A new, debounced function.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  // Timeout handle to store the timer reference
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    // 1. Clear any existing timer to reset the debounce countdown
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 2. Set a new timer
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  } as T & { cancel: () => void };

  /**
   * Immediately cancels any pending execution of the debounced function.
   */
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}
