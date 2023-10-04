import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debugLog = (msg: string) => {
  if (process.env.NODE_ENV === "development") {
      console.log(msg);
  }
}

export function formatDate(dte: string | Date) {
  const jsDate = new Date(dte);
  return `${jsDate.getDate()} ${months[jsDate.getMonth()]} ${jsDate.getFullYear()}`
}

export function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random()*(max - min + 1))
}

export const randomString = (length: number) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const handelize = (txt: string) => {
  return String(txt).replace(/[^\w\s]/g,'').split(" ").join("-").toLowerCase();
}