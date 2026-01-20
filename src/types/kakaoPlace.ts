// 1️⃣ 카카오 추천 결과용 (리스트 / 지도)
export type KakaoPlace = {
  id: string; // 카카오플레이스id
  name: string;
  lat: number;
  lng: number;
  address: string;
  roadAddress: string;
  categoryName: string;
  categoryGroupCode: string;
  phone?: string;
};
