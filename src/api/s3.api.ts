import axiosApi from "./AxiosApi";

export interface PresignedUploadRes {
  uploadUrl: string;
  fileUrl: string;
}

export const getPresignedUrlApi = async ({
  folder,
  originalFileName,
  contentType,
}: {
  folder: string;
  originalFileName: string;
  contentType: string;
}): Promise<PresignedUploadRes> => {
  const res = await axiosApi.get("/api/s3/upload-url", {
    params: {
      folder,
      originalFileName,
      contentType,
    },
  });

  return res.data;
};
