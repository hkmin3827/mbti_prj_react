import axiosApi from "./AxiosApi";

export const likePlaceApi = (
  placeId: number,
  type: "LIKE" | "DISLIKE",
  context: "SELF" | "PARTNER" = "SELF"
) =>
  axiosApi.post(`/api/reactions/places/${placeId}`, null, {
    params: { type, context },
  });

export const removeReactionApi = (
  placeId: number,
  type: "LIKE" | "DISLIKE",
  context: "SELF" | "PARTNER" = "SELF"
) =>
  axiosApi.delete(`/api/reactions/places/${placeId}`, {
    params: { type, context },
  });

export const saveBookmarkApi = (
  placeId: number,
  context: "SELF" | "PARTNER" = "SELF"
) =>
  axiosApi.post(`/api/bookmarks/places/${placeId}`, null, {
    params: { context },
  });

export const unsaveBookmarkApi = (placeId: number) =>
  axiosApi.delete(`/api/bookmarks/places/${placeId}`);
