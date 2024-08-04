import { GET, POST } from "./baseRequest";

export const login = async (data: any) => await POST("auth/getProfiles", data);
export const getProfileConfig = async (data: any) => await POST("auth/getProfileConfig", data);
export const getAllMenus = async (data: any) => await GET("auth/getAllMenus", data);
export const getAllRoles = async (data: any) => await GET("auth/getAllRoles", data);