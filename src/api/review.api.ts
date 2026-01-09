import axiosApi, { type PageResponse } from "./AxiosApi";

export interface CreateReviewParams {
  placeId: number;
  rating: number;
  content: string;
  reviewImageUrl?: string;
  receiptImage?: File;
}
export interface UpdateReviewParams {
  reviewId: number;
  rating: number;
  content: string;
  reviewImageUrl?: string | null;
  removeImage: boolean;
}

export interface PlaceSearchResponse {
  id: number;
  name: string;
  address: string;
  roadAddress: string;
}

export interface ReviewResponse {
  id: number;
  rating: number;
  content: string;
  reviewImageUrl?: string;
  viewCount: number;
  verified: boolean;
  createdAt: string;
  mine: boolean | null;
  user: {
    id: number;
    name: string;
    profileImg: string | null;
    mbti: string;
    partnerMbti: string | null;
  };
  place: {
    id: number;
    name: string;
    address: string;
  };
}

export const getReviewBoardApi = async (
  page = 0,
  size = 10,
  sort: "LATEST" | "VIEWS" = "LATEST"
): Promise<PageResponse<ReviewResponse>> => {
  const res = await axiosApi.get("/api/reviews", {
    params: {
      page,
      size,
      sort,
    },
  });

  return res.data;
};

export const getReviewDetailApi = async (
  reviewId: number
): Promise<ReviewResponse> => {
  const res = await axiosApi.get(`/api/reviews/${reviewId}`);
  return res.data;
};

export const getPlaceReviewsApi = async (
  placeId: number,
  page = 0,
  size = 3
): Promise<PageResponse<ReviewResponse>> => {
  const res = await axiosApi.get(`/api/places/${placeId}/reviews`, {
    params: { page, size },
  });
  return res.data;
};

export const createReviewApi = async (
  params: CreateReviewParams
): Promise<number> => {
  const formData = new FormData();

  formData.append("placeId", String(params.placeId));
  formData.append("rating", String(params.rating));
  formData.append("content", params.content);

  if (params.reviewImageUrl) {
    formData.append("reviewImageUrl", params.reviewImageUrl);
  }

  if (params.receiptImage) {
    formData.append("receiptImage", params.receiptImage);
  }

  const res = await axiosApi.post("/api/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // reviewId
};

export const updateReviewApi = async ({
  reviewId,
  ...body
}: UpdateReviewParams): Promise<void> => {
  await axiosApi.patch(`/api/reviews/${reviewId}`, body);
};

export const deleteReviewApi = async (reviewId: number): Promise<void> => {
  await axiosApi.delete(`/api/reviews/${reviewId}`);
};

export const searchPlaceForReviewApi = async (
  keyword: string
): Promise<PlaceSearchResponse[]> => {
  const res = await axiosApi.get("/api/reviews/search-place", {
    params: { keyword },
  });

  return res.data;
};
