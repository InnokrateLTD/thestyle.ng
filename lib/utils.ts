import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | Date) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric", 
    year: "numeric", 
  });
}
export const formatAmount = (price: string | number | undefined) => {
  if (price) {
    const str = price.toString().split(".");
    if (str[0].length >= 3) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (!str[1]) {
      str[1] = "00";
    }
    return str.join(".");
  }
};
export const formatDateToYYYYMMDD = (inputDate: Date | string | undefined): string => {
  if (!inputDate) {
      return ""; // or handle the undefined case according to your requirement
  }

  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
/**
 * Given a number n, creates an array of length n. Useful for mapping.
 */
export const range = (start: number, end?: number, step = 1) => {
  const output = []

  if (typeof end === "undefined") {
    end = start
    start = 0
  }

  for (let i = start; i < end; i += step) {
    output.push(i)
  }

  return output
}

// Generate A-Z
export const generateAlphabet = (): string[] => {
  return Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
};