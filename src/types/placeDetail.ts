// 내부 Place 상세용 (우측 패널)
export type PlaceDetail = {
  id: number; // 내부 placeId
  name: string;
  category: string;
  address: string;
  roadAddress: string | null;
  latitude: number;
  longitude: number;
  rating: number | null;
  description: string | null;
  kakaoPlaceId: string;
  telnum: string | null;
  myReaction: "LIKE" | "DISLIKE" | null;
  bookmarked: boolean;
};
