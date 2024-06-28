import { POST } from "./baseRequest";

export const login = async (data: any) => await POST("login", data);