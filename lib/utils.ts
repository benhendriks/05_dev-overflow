import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Calculate time ago
  if (timeDiff < minute) {
    const seconds = Math.floor(timeDiff / 1000);
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  } else if (timeDiff < hour) {
    const minutes = Math.floor(timeDiff / minute);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (timeDiff < day) {
    const hours = Math.floor(timeDiff / hour);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (timeDiff < week) {
    const days = Math.floor(timeDiff / day);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (timeDiff < month) {
    const weeks = Math.floor(timeDiff / week);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (timeDiff < year) {
    const months = Math.floor(timeDiff / month);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    const years = Math.floor(timeDiff / year);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
};

// Example usage:
const createdAt = new Date('2023-09-01T12:00:00.000Z');
const formattedTimeAgo = getTimeStamp(createdAt);
console.log(formattedTimeAgo); // Output: "1 day ago" (or similar)

export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    const formatted = (number / 1000000).toFixed(1);
    return formatted + 'M';
  } else if (number >= 1000) {
    const formatted = (number / 1000).toFixed(1);
    return formatted + 'K';
  } else {
    return number.toString();
  }
};
