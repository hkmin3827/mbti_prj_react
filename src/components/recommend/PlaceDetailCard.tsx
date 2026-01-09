import {
  DetailCard,
  ReactionContainer,
  ReactionButton,
} from "../../styles/recommend/PlaceDetailCard.styles";
import {
  Header,
  CloseButton,
  Body,
  Title,
  Meta,
} from "../../styles/review/ReviewDetailDrawer.styles";
import {
  ReviewSection,
  ReviewHeader,
  ReviewTitle,
  ReviewMoreButton,
  ReviewList,
  ReviewCard,
  ReviewRating,
  ReviewContent,
} from "../../styles/PlaceDetailDrawer.styles";
import type { PlaceDetail } from "../../types/placeDetail";
import { getPlaceReviewsApi, type ReviewResponse } from "../../api/review.api";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  likePlaceApi,
  removeReactionApi,
  saveBookmarkApi,
  unsaveBookmarkApi,
} from "../../api/placeAction.api";
import { BookMarkContainer } from "../../styles/PlaceDetailDrawer.styles";
import { MdBookmark } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { ThinDivider } from "../../styles/review/ReviewWriteModal.styles";

interface PlaceDetailCardProps {
  place: PlaceDetail;
  onClose: () => void;
  context: "SELF" | "PARTNER";
}

type ReactionType = "LIKE" | "DISLIKE" | null;

export function PlaceDetailCard({
  place,
  onClose,
  context,
}: PlaceDetailCardProps) {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [reaction, setReaction] = useState<ReactionType>(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!place?.id) return;

    // 서버 응답 → UI 상태 동기화
    setReaction(place.myReaction ?? null);
    setBookmarked(place.bookmarked ?? false);

    // 리뷰 조회
    getPlaceReviewsApi(Number(place.id), 0, 3).then((res) => {
      setReviews(res.content);
      setReviewCount(res.totalElements);
    });
  }, [place.id, context]);
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
  if (!place) return null;

  const handleReaction = async (type: "LIKE" | "DISLIKE") => {
    if (reaction === type) {
      await removeReactionApi(place.id, reaction, context);
      setReaction(null);
      return;
    }

    await likePlaceApi(place.id, type, context);
    setReaction(type);
  };

  const handleBookmark = async () => {
    if (bookmarked) {
      await unsaveBookmarkApi(place.id);
      setBookmarked(false);
    } else {
      await saveBookmarkApi(place.id, context);
      setBookmarked(true);
    }
  };
  return (
    <DetailCard>
      <Header style={{ padding: "10px 20px" }}>
        <Title>{place.name}</Title>

        <BookMarkContainer onClick={handleBookmark}>
          {bookmarked ? (
            <MdBookmark style={{ color: "#e4c724" }} />
          ) : (
            <FiBookmark />
          )}
          <CloseButton onClick={onClose}>✕</CloseButton>
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
        <ReactionContainer>
          <ReactionButton
            $active={reaction === "LIKE"}
            onClick={() => handleReaction("LIKE")}
          >
            좋아요 👎🏻
          </ReactionButton>

          <ReactionButton
            $active={reaction === "DISLIKE"}
            onClick={() => handleReaction("DISLIKE")}
          >
            싫어요 👎🏻
          </ReactionButton>
        </ReactionContainer>
        <ThinDivider />
        <ReviewSection>
          <ReviewHeader>
            <ReviewTitle>리뷰 ({reviewCount})</ReviewTitle>

            <ReviewMoreButton
              onClick={() => navigate(`/places/${place.id}/reviews`)}
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
                <ReviewContent>
                  {" "}
                  {review.content.length > 18
                    ? `${review.content.slice(0, 18)}...`
                    : review.content}
                </ReviewContent>
              </ReviewCard>
            ))}
          </ReviewList>
        </ReviewSection>
      </Body>
    </DetailCard>
  );
}
