import axiosApi, { type PageResponse } from "./AxiosApi";
import type { ReviewResponse } from "./review.api";
import type { PlaceResponse } from "../types/placeResponse";

export const getMyReviewsApi = async (
  page = 0,
  size = 10
): Promise<PageResponse<ReviewResponse>> => {
  const res = await axiosApi.get("/api/reviews/me", {
    params: { page, size },
  });

  return res.data;
};

export const getMyViewHistoryApi = async (): Promise<PlaceResponse[]> => {
  const res = await axiosApi.get("/api/views/me");
  return res.data;
};
export const getMyBookMarksApi = async (): Promise<PlaceResponse[]> => {
  const res = await axiosApi.get("/api/bookmarks");
  return res.data;
};

export const getMyLikesApi = async (): Promise<PlaceResponse[]> => {
  const res = await axiosApi.get("/api/reactions");
  return res.data;
};
