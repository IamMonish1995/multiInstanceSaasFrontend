import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { JwtPayload, jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import CryptoJS from "crypto-js";

export function encryptJSON(obj:any) {
  return new Promise((resolve, reject) => {
    try {
      let key = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string; 
      const jsonString = JSON.stringify(obj);
      const ciphertext = CryptoJS.AES.encrypt(jsonString, key).toString();
      resolve(ciphertext);
    } catch (error) {
      console.log(error);
      reject("Encryption Failed");
    }
  });
}

// Decrypt JSON object
export function decryptJSON(ciphertext:any) {
  return new Promise( async (resolve, reject) => {
    try {
      let key = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string;
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      if(bytes.words.length > 0){
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedObj = JSON.parse(decryptedString);
        resolve(decryptedObj);
      }else{
        setTimeout(() => {
          if(bytes.words.length > 0){
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
            const decryptedObj = JSON.parse(decryptedString);
            resolve(decryptedObj);
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      reject("Decryption Failed");
    }
  });
}

export const getDefaultProfile = (userProfiles: { systemProfiles: any[]; organizationProfiles: any[]; clientProfiles: any[]; }) => {
  let selectedProfile = null;

  // Check for active System Admin profile
  const systemAdminProfile = userProfiles.systemProfiles.find((profile: any) => 
    profile.role_id.role_name === "System Admin" && profile.status_id.status_name === "Active"
  );
  if (systemAdminProfile) {
    selectedProfile = systemAdminProfile;
  } else {
    // Check for active Org Admin profile
    const orgAdminProfile = userProfiles.organizationProfiles.find((profile: any) => 
      profile.role_id.role_name === "Org Admin" && profile.status_id.status_name === "Active"
    );
    if (orgAdminProfile) {
      selectedProfile = orgAdminProfile;
    } else {
      // Check for active Client Admin profile
      const clientAdminProfile = userProfiles.clientProfiles.find((profile: any) => 
        profile.role_id.role_name === "Client Admin" && profile.status_id.status_name === "Active"
      );
      if (clientAdminProfile) {
        selectedProfile = clientAdminProfile;
      } else {
        // Check for active Guest profile
        const guestProfile = userProfiles.systemProfiles.find((profile: any) => 
          profile.role_id.role_name === "System Guest" && profile.status_id.status_name === "Active"
        );
        if (guestProfile) {
          selectedProfile = guestProfile;
        }
      }
    }
  }

  // Log the selected profile if debugging is needed
  if (selectedProfile) {
    // console.log({selectedProfile});
  } else {
    console.log("No suitable profile found.");
  }

  return selectedProfile;
};

export const getAccessForMenu = (menuAccessName:any,accessList:any) => {  
  let accessObject = {
    "can_create": false,
    "can_read": false,
    "can_update": false,
    "can_delete": false
} 
   const index = accessList?.findIndex((item:any)=>item.menu_id.menu_name === menuAccessName)
   if(index !== -1){
       accessObject = accessList[index]
   }

return accessObject
}


export const decodeToken = (token:any)=>{
  const decodedData = jwtDecode<JwtPayload>(token)
  return decodedData
}
