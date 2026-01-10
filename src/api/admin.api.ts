import type { Category } from "../types/category";
import axiosApi from "./AxiosApi";

/* ================= USERS ================= */

export const getUsersApi = (params: {
  page: number;
  size: number;
  active?: boolean;
  keyword?: string;
}) => axiosApi.get("/api/admin/users", { params });

export const activateUserApi = (userId: number) =>
  axiosApi.patch(`/api/admin/users/${userId}/activate`);

export const deactivateUserApi = (userId: number) =>
  axiosApi.patch(`/api/admin/users/${userId}/deactivate`);

/* ================= PLACES ================= */
export const getPlacesAdminApi = (params: {
  page: number;
  size: number;
  category?: Category;
  keyword?: string;
}) => axiosApi.get("/api/admin/places", { params });

export const softDeletePlaceApi = (placeId: number) =>
  axiosApi.patch(`/api/admin/${placeId}/soft-delete`);

export const restorePlaceApi = (placeId: number) =>
  axiosApi.patch(`/api/admin/${placeId}/restore`);

export const hardDeletePlaceApi = (placeId: number) =>
  axiosApi.delete(`/api/admin/${placeId}`);

/* ================= REVIEWS ================= */

export const getReviewsAdminApi = (params: {
  page: number;
  size: number;
  placeName?: string;
}) => axiosApi.get("/api/admin/reviews", { params });

export const deleteReviewAdminApi = (reviewId: number) =>
  axiosApi.delete(`/api/admin/reviews/${reviewId}`);
