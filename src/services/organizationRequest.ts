import axios from "axios";
let MAIN_URL = process.env.NEXT_PUBLIC_BACKEND_API;

// Save organization
export const createorganization = async (data: any) => {
  try {
    const res = await axios.post(`${MAIN_URL}/createorganization`, data, {
      headers: {
        Authorization: "Bearer ",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const loginorganization = async (data: any) => {
  try {
    const res = await axios.post(`${MAIN_URL}/loginorganization`, data, {
      headers: {
        Authorization: "Bearer ",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};