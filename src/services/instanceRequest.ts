'use client'
import axios from "axios";
let MAIN_URL = process.env.NEXT_PUBLIC_BACKEND_API;

// Save organization
export const createinstance = async ({data,token}: any) => {
  if (!token) {
    throw "No Token";
  }
  try {
    const res = await axios.post(`${MAIN_URL}/createinstance`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw "Something went wrong";
  }
};

// Get All Academy donations
export const getAllAcademyDonations = async ({params,token}: any) => {
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
    throw "Something went wrong";
  }
};
