import { BADGE_CRITERIA } from '@/constants';
import { BadgeCounts } from '@/types';
import { clsx, type ClassValue } from "clsx";
import qs from 'query-string';
import { twMerge } from "tailwind-merge";

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
export const formatAndDivideNumber = (number: number): string => {
  if (number >= 1000000) {
    const formatted = (number / 1000000).toFixed(1);
    return formatted + 'M';
  } else if (number >= 1000) {
    const formatted = (number / 1000).toFixed(1);
    return formatted + 'K';
  } else {
    return number?.toString();
  }
};
export const getJoinedDate = (dateObject: Date): string => {
  const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
};
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  }, { skipNull: true });
}
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach(key => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  }, { skipNull: true });
}
interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[]
}
export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  }
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    })
  })
  return badgeCounts;
}
