import axiosApi from "./AxiosApi";
import type { PlaceResponse } from "../types/placeResponse";

export interface PlaceViewCountResponse {
  place: PlaceResponse;
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
