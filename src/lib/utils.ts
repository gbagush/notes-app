import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const showFormattedDate = (date: string, lang: "id" | "en") => {
  return new Date(date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export { cn, showFormattedDate };
