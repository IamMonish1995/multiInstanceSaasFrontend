import { GET, POST } from "./baseRequest";

export const login = async (data: any) => await POST("auth/getProfiles", data);
export const getProfileConfig = async (data: any) => await POST("auth/getProfileConfig", data);
export const getAllMenus = async (data: any) => await GET("auth/getAllMenus", data);
export const getAllRoles = async (data: any) => await GET("auth/getAllRoles", data);
export const saveNewRole = async (data: any) => await POST("auth/saveNewRole", data);
export const updateRole = async (data: any) => await POST("auth/updateRole", data);
export const deleteRole = async (data: any) => await POST("auth/deleteRole", data);