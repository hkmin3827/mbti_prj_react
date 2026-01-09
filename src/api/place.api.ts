// api/place.api.ts
import axiosApi from "./AxiosApi";
import type { PlaceDetail } from "../types/placeDetail";
export const getPlaceDetailApi = async (
  placeId: number,
  context: "SELF" | "PARTNER"
): Promise<PlaceDetail> => {
  const res = await axiosApi.get("/api/places/detail", {
    params: { placeId, context },
  });
  return res.data;
};
