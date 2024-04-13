import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { JwtPayload, jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import CryptoJS from "crypto-js";

// Encrypt JSON object
export function encryptJSON(obj: any) {
  let key = process.env.JWT_SECRET_KEY as string;
  const jsonString = JSON.stringify(obj);
  const ciphertext = CryptoJS.AES.encrypt(jsonString, key).toString();
  return ciphertext;
}

// Decrypt JSON object
export function decryptJSON(ciphertext: any,key:any) {
  let decryptedObj = null;
  if (key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    decryptedObj = JSON.parse(decryptedString);
  }
  return decryptedObj;
}

export const decodeToken = (token:string)=>{
  const decodedData = jwtDecode<JwtPayload>(token)
  return decodedData
}