import { useEffect, useRef, useState } from "react";
import { loadKakaoMap } from "../lib/kakaoMap";
import {
  PageGrid,
  LeftPanel,
  RightPanel,
} from "../styles/recommend/RecommendLayout.styles";
import { SearchBar } from "../components/recommend/SearchBar";
import { ContextSelector } from "../components/recommend/ContextSelector";
import { RecommendList } from "../components/recommend/RecommendList";
import { PlaceDetailCard } from "../components/recommend/PlaceDetailCard";
import { SearchSuggestionList } from "../components/recommend/SearchSuggestionList";
import type { Category } from "../types/category";
import { useSearchParams } from "react-router-dom";
import type { MbtiContext } from "../constant/MbtiContext";
import { recommendPlacesApi } from "../api/recommend.api";
import type { KakaoPlace } from "../types/kakaoPlace";
import { viewPlaceApi } from "../api/view.api";
import { getPlaceDetailApi } from "../api/place.api";
import type { PlaceDetail } from "../types/placeDetail";

// 검색 자동완성 전용
export type KakaoPlaceSuggestion = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
};

export default function RecommendPage() {
  const PAGE_SIZE = 5;

  // URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const context = (searchParams.get("context") as MbtiContext) ?? "SELF";
  const category = (searchParams.get("category") as Category) ?? "CAFE";

  // Map refs
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markerMapRef = useRef<Map<string, kakao.maps.Marker>>(new Map());
  const activeMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const hasFetchedLocation = useRef(false);

  // UI state
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [keyword, setKeyword] = useState("");

  // 지도 / 리스트 / 마커용
  const [selectedKakaoPlace, setSelectedKakaoPlace] =
    useState<KakaoPlace | null>(null);
  // 오른쪽 상세 패널 전용
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail | null>(null);

  const [suggestions, setSuggestions] = useState<KakaoPlaceSuggestion[]>([]);
  const skipNextEffectRef = useRef(false);

  const [allPlaces, setAllPlaces] = useState<KakaoPlace[]>([]); // 전체 20
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allPlaces.length / PAGE_SIZE);

  const start = page * PAGE_SIZE;
  const places = allPlaces.slice(start, start + PAGE_SIZE);

  const FALLBACK_LOCATION = {
    lat: 37.498095,
    lng: 127.02761,
  };

  const getActiveMarkerImage = () =>
    new window.kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      new window.kakao.maps.Size(24, 35),
      {
        offset: new window.kakao.maps.Point(12, 35),
      }
    );

  const selectKakaoPlace = (place: KakaoPlace) => {
    setSelectedKakaoPlace(place);

    const kakao = window.kakao;
    const center = new kakao.maps.LatLng(place.lat, place.lng);

    mapInstance.current?.panTo(center);

    if (activeMarkerRef.current) {
      activeMarkerRef.current.setImage(null);
      activeMarkerRef.current.setZIndex(1);
    }

    const marker = markerMapRef.current.get(place.id);
    if (marker) {
      marker.setImage(getActiveMarkerImage());
      marker.setZIndex(10);
      activeMarkerRef.current = marker;
    }
  };

  const handlePlaceCardClick = async (place: KakaoPlace) => {
    try {
      // 1️⃣ view API (Place 생성 + 로그)
      const { placeId } = await viewPlaceApi(
        {
          kakaoPlaceId: String(place.id),
          name: place.name,
          address: place.address,
          roadAddress: place.roadAddress,
          latitude: place.lat,
          longitude: place.lng,
          categoryName: place.categoryName,
          categoryGroupCode: place.categoryGroupCode,
          phone: place.phone,
        },
        context
      );

      // 2️⃣ 내부 Place 상세 조회
      const detail: PlaceDetail = await getPlaceDetailApi(placeId, context);

      // 3️⃣ 오른쪽 상세 패널만 갱신
      setPlaceDetail(detail);

      // 4️⃣ 지도/마커 선택 동기화
      selectKakaoPlace(place);
    } catch (e: any) {
      const status = e?.response?.status;

      if (status === 403) {
        alert("해당 장소는 비활성화되어 접근할 수 없습니다.");
        return;
      }

      alert("장소 정보를 불러올 수 없습니다.");
    }
  };

  const redrawMarkers = (places: KakaoPlace[]) => {
    if (!mapInstance.current) return;
    if (!places || places.length === 0) return;

    markerMapRef.current.forEach((marker) => marker.setMap(null));
    markerMapRef.current.clear();

    places.forEach((p) => {
      const marker = new window.kakao.maps.Marker({
        map: mapInstance.current!,
        position: new window.kakao.maps.LatLng(p.lat, p.lng),
        zIndex: 1,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        handlePlaceCardClick(p);
      });

      markerMapRef.current.set(p.id, marker);
    });
  };

  const fetchRecommend = async (lat: number, lng: number) => {
    try {
      const res = await recommendPlacesApi({ lat, lng, category, context });

      const mapped: KakaoPlace[] = res.documents.map((doc, idx) => ({
        id: String(doc.id ?? idx),
        name: doc.place_name,
        lat: Number(doc.y),
        lng: Number(doc.x),
        address: doc.address_name,
        roadAddress: doc.road_address_name,
        categoryName: doc.category_name,
        categoryGroupCode: doc.category_group_code,
        phone: doc.phone,
      }));

      // 전체 추천 저장
      setAllPlaces(mapped);

      // 페이지 초기화
      setPage(0);

      redrawMarkers(mapped);

      // 첫 페이지 리스트
      // setPlaces(mapped.slice(0, PAGE_SIZE));

      // 추천 새로 생성되면 상세 선택 초기화가 안전
      setPlaceDetail(null);
    } catch (e) {
      console.error("추천 API 실패", e);
    }
  };
  const fetchSuggestions = (keyword: string) => {
    if (!window.kakao?.maps?.services) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (
        data: kakao.maps.services.PlacesSearchResult,
        status: kakao.maps.services.Status
      ) => {
        console.log("[fetchSuggestions CALLBACK]", keyword, Date.now());

        if (status !== "OK") {
          setSuggestions([]);
          return;
        }

        setSuggestions(
          data.map((p: kakao.maps.services.PlacesSearchResultItem) => ({
            id: p.id,
            name: p.place_name,
            lat: Number(p.y),
            lng: Number(p.x),
            address: p.road_address_name || p.address_name,
          }))
        );
      }
    );
  };

  const searchByPlace = (place: KakaoPlaceSuggestion) => {
    skipNextEffectRef.current = true;
    clearTimeout(debounceTimerRef.current!);

    setKeyword(place.name);
    setSuggestions([]);

    mapInstance.current?.setCenter(
      new window.kakao.maps.LatLng(place.lat, place.lng)
    );

    fetchRecommend(place.lat, place.lng);
  };

  useEffect(() => {
    if (!mapInstance.current) return;

    requestAnimationFrame(() => {
      mapInstance.current!.relayout();
      const center = mapInstance.current!.getCenter();
      mapInstance.current!.setCenter(center);
    });
  }, [placeDetail]);

  useEffect(() => {
    (async () => {
      const kakao = await loadKakaoMap();
      if (!mapRef.current) return;

      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(
          FALLBACK_LOCATION.lat,
          FALLBACK_LOCATION.lng
        ),
        level: 4,
        draggable: true,
      });

      mapInstance.current = map;

      navigator.geolocation?.getCurrentPosition(
        (pos) => {
          if (hasFetchedLocation.current) return;
          hasFetchedLocation.current = true;

          mapInstance.current?.setCenter(
            new window.kakao.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            )
          );

          fetchRecommend(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          fetchRecommend(FALLBACK_LOCATION.lat, FALLBACK_LOCATION.lng);
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    mapInstance.current.relayout();
    const center = mapInstance.current.getCenter();
    mapInstance.current.setCenter(center);
  }, [selectedKakaoPlace]);

  useEffect(() => {
    if (!mapInstance.current) return;
    const center = mapInstance.current.getCenter();
    fetchRecommend(center.getLat(), center.getLng());
  }, [category, context]);

  useEffect(() => {
    if (skipNextEffectRef.current) {
      skipNextEffectRef.current = false;
      return;
    }

    if (keyword.trim().length < 2) return;

    clearTimeout(debounceTimerRef.current!);
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(keyword);
    }, 200);
  }, [keyword]);

  return (
    <div>
      <ContextSelector
        value={context}
        onChange={(next) => {
          if (next === context) return; // 동일하면 아무 것도 안 함

          setSearchParams((prev) => {
            prev.set("context", next);
            return prev;
          });

          setPlaceDetail(null); // context 변경 시에만 실행
        }}
      />
      <PageGrid $hasDetail={!!placeDetail}>
        <LeftPanel>
          <div>
            <SearchBar value={keyword} onChange={setKeyword} />
            {suggestions.length > 0 && keyword.trim().length >= 2 && (
              <SearchSuggestionList
                items={suggestions}
                onSelect={searchByPlace}
              />
            )}
          </div>

          <div
            ref={mapRef}
            style={{
              height: "320px",
              borderRadius: "12px",
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          />

          {places.length > 0 && (
            <RecommendList
              places={places}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              onSelect={handlePlaceCardClick}
            />
          )}
        </LeftPanel>

        {selectedKakaoPlace && placeDetail !== null && (
          <RightPanel>
            {placeDetail && (
              <PlaceDetailCard
                place={placeDetail}
                context={context}
                onClose={() => {
                  setPlaceDetail(null);
                  if (activeMarkerRef.current) {
                    activeMarkerRef.current.setImage(null);
                    activeMarkerRef.current.setZIndex(1);
                  }
                }}
              />
            )}
          </RightPanel>
        )}
      </PageGrid>
    </div>
  );
}
