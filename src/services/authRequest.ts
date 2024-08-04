import { POST } from "./baseRequest";

export const login = async (data: any) => await POST("auth/getProfiles", data);
export const getProfileConfig = async (data: any) => await POST("auth/getProfileConfig", data);