import axiosApi from "./AxiosApi";
import type { PlaceResponse } from "../types/placeResponse";
import type { Category } from "../types/category";

export interface PlaceViewCountResponse {
  placeId: number;
  name: string;
  address: string;
  roadAddress: string;
  category: Category;
  rating: number;
  viewCount: number;
}

export const getMostViewedPlacesByMbti = async (mbti: string, limit = 5) => {
  const res = await axiosApi.get<PlaceViewCountResponse[]>(
    `/api/views/most-viewed`,
    {
      params: { mbti, limit },
    }
  );
  return res.data;
};

export const getMostReviewedPlaces = async (limit = 5) => {
  const res = await axiosApi.get<PlaceResponse[]>(
    `/api/reviews/most-reviewed`,
    {
      params: { limit },
    }
  );
  return res.data;
};
