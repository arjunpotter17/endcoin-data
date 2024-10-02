import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { data } from "@/constants/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

