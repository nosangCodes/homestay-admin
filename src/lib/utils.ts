import { FileType } from "@/enum";
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

const mimeTypes = {
  image: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  video: [
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
  ],
};

export function getMimeType(type: FileType = FileType.image) {
  return mimeTypes[FileType[type]];
}
