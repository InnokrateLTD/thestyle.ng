import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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