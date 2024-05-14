import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function textSlice(text: string, sliceLimit = 100) {
  if (text.length < sliceLimit) return text;
  return text.slice(0, sliceLimit) + "...";
}

export function formatDate(date: string, format = "DD MMMM, YY") {
  return moment(date).format(format);
}
