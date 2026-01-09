import { RatingStars } from "./RatingStars";
import {
  Card,
  Header,
  PlaceName,
  VerifiedBadge,
  Content,
  Thumbnail,
  CardGrid,
  TextArea,
  ImageArea,
  Address,
  MetaRow,
  MetaText,
  MbtiBadge,
  PartnerMbtiBadge,
  Sub,
} from "../../styles/review/ReviewCard.styles";
import type { ReviewResponse } from "../../api/review.api";
import heart from "../../assets/logos/3D하트.png";
import { useLocation, useNavigate } from "react-router-dom";
export function ReviewCard({ review }: { review: ReviewResponse }) {
  const navigate = useNavigate();
  const location = useLocation();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  return (
    <Card
      onClick={() =>
        navigate(`/reviews/${review.id}`, {
          state: { background: location },
        })
      }
    >
      <CardGrid>
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
              {review.content.length > 100
                ? `${review.content.slice(0, 100)}...`
                : review.content}
            </Content>
          )}
        </TextArea>
        <ImageArea $hasImage={!!review.reviewImageUrl}>
          {review.reviewImageUrl && <Thumbnail src={review.reviewImageUrl} />}
        </ImageArea>
        <MetaRow>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            조회 {review.viewCount}
          </span>

          <div className="mbti-row">
            <MbtiBadge>{review.user.mbti}</MbtiBadge>

            {review.user.partnerMbti && (
              <>
                <img src={heart} alt="하트(사이트로고)" width="18" />
                <PartnerMbtiBadge>{review.user.partnerMbti}</PartnerMbtiBadge>
              </>
            )}
          </div>

          <MetaText>
            {review.user.name} · {formatDate(review.createdAt)}
          </MetaText>
        </MetaRow>
      </CardGrid>
    </Card>
  );
}
