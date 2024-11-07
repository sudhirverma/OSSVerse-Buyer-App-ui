import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCY_INR, LOCALE_EN_IN } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat(LOCALE_EN_IN, {
  style: "currency",
  currency: CURRENCY_INR,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
