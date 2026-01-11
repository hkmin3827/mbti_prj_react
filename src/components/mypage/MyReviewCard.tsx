import { useLocation, useNavigate } from "react-router-dom";
import type { ReviewResponse } from "../../api/review.api";
import { ReviewCard } from "../../styles/mypage/Card.styles";
import {
  Inner,
  TextArea,
  Header,
  PlaceName,
  Address,
  Sub,
  VerifiedBadge,
  Content,
  Bottom,
  MetaText,
  ImageArea,
  Thumbnail,
} from "../../styles/mypage/MyReviewCard.styles";
import { RatingStars } from "../review/RatingStars";
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
export function MyReviewCard({ review }: { review: ReviewResponse }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  return (
    <ReviewCard
      onClick={() =>
        navigate(`/reviews/${review.id}`, {
          state: { background: location },
        })
      }
    >
      <Inner>
        <TextArea>
          <Header>
            <PlaceName>{review.place.name}</PlaceName>
            <Address>{review.place.address}</Address>
          </Header>

          <Sub>
            <RatingStars rating={review.rating} />
            {review.verified && (
              <VerifiedBadge className="material-symbols-outlined">
                verified
              </VerifiedBadge>
            )}
          </Sub>

          {review.content && (
            <Content>
              {review.content.length > 30
                ? `${review.content.slice(0, 30)}...`
                : review.content}
            </Content>
          )}
          <Bottom>
            <MetaText>조회 {review.viewCount}</MetaText>
            <MetaText>{formatDate(review.createdAt)}</MetaText>
          </Bottom>
        </TextArea>
        {!isMobile && (
          <ImageArea $hasImage={!!review.reviewImageUrl}>
            {review.reviewImageUrl && <Thumbnail src={review.reviewImageUrl} />}
          </ImageArea>
        )}
      </Inner>
    </ReviewCard>
  );
}
