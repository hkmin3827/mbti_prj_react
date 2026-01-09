import type { MbtiContext } from "../constant/MbtiContext";
import type { Category } from "../types/category";
import axiosApi from "./AxiosApi";

interface KakaoMapResponse {
  documents: KakaoDocument[];
  meta: {
    totalCount: number;
    isEnd: boolean;
  };
}

interface KakaoDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  address_name: string;
  road_address_name: string;
  x: string; // lng
  y: string; // lat
  place_url?: string;
  phone?: string;
}
export interface RecommendPlacesParams {
  context?: MbtiContext; // SELF | PARTNER
  lat?: number;
  lng?: number;
  category?: Category; // Category enum 문자열
  size?: number;
  radius?: number;
}

export const recommendPlacesApi = async (params: RecommendPlacesParams) => {
  const res = await axiosApi.get<KakaoMapResponse>("/api/places/search", {
    params: {
      context: params.context ?? "SELF",
      lat: params.lat,
      lng: params.lng,
      category: params.category,
      size: params.size ?? 20,
      radius: params.radius ?? 2000,
    },
  });

  return res.data;
};
