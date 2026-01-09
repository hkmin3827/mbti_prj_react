import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Overlay,
  Drawer,
  Header,
  CloseButton,
  Body,
  Title,
  Meta,
} from "../styles/review/ReviewDetailDrawer.styles";
import {
  ReviewSection,
  ReviewHeader,
  ReviewTitle,
  ReviewMoreButton,
  ReviewList,
  ReviewCard,
  ReviewRating,
  ReviewContent,
  BookMarkContainer,
} from "../styles/PlaceDetailDrawer.styles";
import { getPlaceDetailApi } from "../api/place.api";
import type { PlaceDetail } from "../types/placeDetail";
import { getPlaceReviewsApi, type ReviewResponse } from "../api/review.api";
import { saveBookmarkApi, unsaveBookmarkApi } from "../api/placeAction.api";
import { MdBookmark } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { ThinDivider } from "../styles/review/ReviewWriteModal.styles";

export default function PlaceDetailDrawer() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [place, setPlace] = useState<PlaceDetail | null>(null);

  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [reviewCount, setReviewCount] = useState(0);

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!placeId) return;

    getPlaceReviewsApi(Number(placeId), 0, 3).then((res) => {
      setReviews(res.content);
      setReviewCount(res.totalElements);
    });
  }, [placeId]);

  /* 1️⃣ 장소 상세 조회 */
  useEffect(() => {
    if (!placeId) return;

    getPlaceDetailApi(Number(placeId), "SELF").then(setPlace);
  }, [placeId]);

  useEffect(() => {
    if (!place) return;
    setBookmarked(place.bookmarked ?? false);
  }, [place]);

  /* 3️⃣ 카카오맵 + 마커 */
  useEffect(() => {
    if (!place || !mapRef.current) return;
    if (!window.kakao) return;

    const center = new window.kakao.maps.LatLng(
      place.latitude,
      place.longitude
    );

    const map = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
    });

    new window.kakao.maps.Marker({
      position: center,
      map,
    });

    // Drawer 안에서 레이아웃 깨짐 방지
    setTimeout(() => {
      map.relayout();
      map.setCenter(center);
    }, 100);
  }, [place]);

  const handleBookmark = async () => {
    if (bookmarked) {
      await unsaveBookmarkApi(Number(placeId));
      setBookmarked(false);
    } else {
      await saveBookmarkApi(Number(placeId), "SELF");
      setBookmarked(true);
    }
  };
  if (!place) return null;

  return (
    <Overlay onClick={() => navigate(-1)}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{place.name}</Title>
          <BookMarkContainer onClick={handleBookmark}>
            {bookmarked ? (
              <MdBookmark style={{ color: "#e4c724" }} />
            ) : (
              <FiBookmark />
            )}
            <CloseButton onClick={() => navigate(-1)}>✕</CloseButton>
          </BookMarkContainer>
        </Header>

        <Body>
          <Meta>
            ⭐ {place.rating ?? "-"}({reviewCount}) · {place.category}
          </Meta>

          <div
            ref={mapRef}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 12,
              margin: "16px 0",
            }}
          />

          <Meta style={{ marginBottom: "5px" }}>{place.roadAddress}</Meta>
          <Meta>{place.address}</Meta>
          {place.telnum && <Meta>📞 {place.telnum}</Meta>}

          {place.description && (
            <p style={{ marginTop: 12 }}>{place.description}</p>
          )}

          <ThinDivider />
          <ReviewSection>
            <ReviewHeader>
              <ReviewTitle>리뷰 ({reviewCount})</ReviewTitle>

              <ReviewMoreButton
                onClick={() =>
                  navigate(`/places/${place.id}/reviews`, {
                    state: { background: location.state?.background },
                  })
                }
              >
                더보기
              </ReviewMoreButton>
            </ReviewHeader>

            <ReviewList>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  onClick={() =>
                    navigate(`/reviews/${review.id}`, {
                      state: { background: location },
                    })
                  }
                >
                  <ReviewRating>⭐ {review.rating}</ReviewRating>
                  <ReviewContent>{review.content}</ReviewContent>
                </ReviewCard>
              ))}
            </ReviewList>
          </ReviewSection>
        </Body>
      </Drawer>
    </Overlay>
  );
}
