import useStorage from "@/hooks/useStorage";
import axios from "axios";
let MAIN_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const GET = async (endPoint: string, params: any) => {
  const { token } = useStorage();
  try {
    const res = await axios.post(`${MAIN_URL}/${endPoint}`, {
      params: params,
      headers: {
          Authorization: "Bearer " + token,
      },
  });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POST = async (endPoint: string, data: any) => {
  const { token } = useStorage();
  try {
    const res = await axios.post(`${MAIN_URL}/${endPoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PUT = async (endPoint: string, data: any) => {
  const { token } = useStorage();
  try {
    const res = await axios.put(`${MAIN_URL}/${endPoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const DELETE = async (endPoint: string, data: any) => {
  const { token } = useStorage();
  try {
    const res = await axios.delete(`${MAIN_URL}/${endPoint}`,{
      headers: {
        Authorization: token
      },
      data: data
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
