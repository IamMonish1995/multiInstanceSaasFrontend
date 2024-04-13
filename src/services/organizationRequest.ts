import axios from "axios";
import Cookies from 'js-cookie';
const token = Cookies.get('token');
let MAIN_URL = process.env.NEXT_PUBLIC_BACKEND_API

// Save organization
export const createorganization = async (data:any) => { 
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
export const loginorganization = async (data:any) => { 
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

// Get All Academy donations
export const getAllAcademyDonations = async (params:any) => {
  
  if (!token) {
    throw "No Token";
  }
  try {
    const res = await axios.get(`${MAIN_URL}/getAllAcademyDonation`, {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res?.data?.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
