import axiosApi from "./AxiosApi";

export interface ProfileBasicReq {
  name: string;
  telnum: string;
  profileImage: string | null;
}

export interface ProfileMbtiReq {
  mbti: string;
  partnerMbti: string | null;
}

export const createBasicProfileApi = async (
  data: ProfileBasicReq
): Promise<void> => {
  await axiosApi.post("/api/users/profile/create/basic", data);
};
export const createMbtiProfileApi = async (
  data: ProfileMbtiReq
): Promise<void> => {
  await axiosApi.post("/api/users/profile/create/mbti", data);
};

export const updateBasicProfileApi = async (
  data: ProfileBasicReq
): Promise<void> => {
  await axiosApi.patch("/api/users/profile/update/basic", data);
};

export const updateMbtiProfileApi = async (
  data: ProfileMbtiReq
): Promise<void> => {
  await axiosApi.patch("/api/users/profile/update/mbti", data);
};
