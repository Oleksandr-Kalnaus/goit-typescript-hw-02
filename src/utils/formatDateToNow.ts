import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
