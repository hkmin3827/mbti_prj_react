import axiosApi from "./AxiosApi";
import type { User } from "../types/user";

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  telnum: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  profileCompleted: boolean;
}
export const signupApi = async (data: SignupRequest): Promise<void> => {
  await axiosApi.post("/auth/signup", data);
};

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axiosApi.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  await axiosApi.post("/auth/logout");
};
export const getMeApi = async (): Promise<User> => {
  const { data } = await axiosApi.get("/api/users/me");
  return data;
};

export interface WithdrawReq {
  reason?: string;
}

export const withdrawApi = (data: { confirmText: string }) => {
  return axiosApi.delete("/auth/withdraw", {
    data,
  });
};
