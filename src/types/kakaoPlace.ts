// 1️⃣ 카카오 추천 결과용 (리스트 / 지도)
export type KakaoPlace = {
  id: number; // kakao id (임시)
  name: string;
  lat: number;
  lng: number;
  address: string;
  roadAddress: string;
  categoryName: string;
  categoryGroupCode: string;
  phone: string;
};
