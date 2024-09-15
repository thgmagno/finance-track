import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeStr = (text: string) =>
  text.charAt(0).toUpperCase().concat(text.slice(1))
