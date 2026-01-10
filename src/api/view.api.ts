import axiosApi from "./AxiosApi";

export interface PlaceSnapshot {
  kakaoPlaceId: string;
  name: string;
  address: string;
  roadAddress?: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  categoryGroupCode: string;
  phone?: string;
}
export interface PlaceViewResponse {
  placeId: number;
}

export const viewPlaceApi = async (
  snapshot: PlaceSnapshot,
  context: "SELF" | "PARTNER"
): Promise<PlaceViewResponse> => {
  const res = await axiosApi.post("/api/views/place", snapshot, {
    params: { context },
  });
  return res.data;
};
export const increaseReviewViewCountApi = async (
  reviewId: number
): Promise<void> => {
  await axiosApi.patch(`/api/reviews/${reviewId}/view`);
};
