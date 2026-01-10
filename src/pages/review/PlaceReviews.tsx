import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewCard } from "../../components/review/ReviewCard";
import type { ReviewResponse } from "../../api/review.api";
import {
  PageWrapper,
  TopRow,
  Pagination,
  PageButton,
  PageInfo,
  ReviewGrid,
} from "../../styles/review/ReviewPage.styles";
import { Title } from "../../styles/mypage/MyPage.styles";
import { getPlaceReviewsApi } from "../../api/review.api";
import { getPlaceDetailApi } from "../../api/place.api";
import styled from "styled-components";

const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  color: #333;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
`;

export default function PlaceReviews() {
  const PAGE_SIZE = 5;

  const { placeId } = useParams<{ placeId: string }>();
  const numericPlaceId = Number(placeId);
  const [placeName, setPlaceName] = useState<string>("");

  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (Number.isNaN(numericPlaceId)) return;

    const fetchDatas = async () => {
      const [place, reviewsRes] = await Promise.all([
        getPlaceDetailApi(numericPlaceId, "SELF"),
        getPlaceReviewsApi(numericPlaceId, page, PAGE_SIZE),
      ]);

      setPlaceName(place.name);
      setReviews(reviewsRes.content);
      setTotalPages(reviewsRes.totalPages);
      setReviewCount(reviewsRes.totalElements);
    };

    fetchDatas();
  }, [numericPlaceId, page]);

  return (
    <PageWrapper>
      <TopRow style={{ justifyContent: "space-between", margin: "0" }}>
        <Title>
          {placeName} 리뷰 ({reviewCount})
        </Title>
        <BackButton onClick={() => navigate(-1)}>
          돌아가기
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </BackButton>
      </TopRow>

      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ReviewGrid>

      <Pagination>
        <PageButton disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          <span className="material-symbols-outlined">arrow_left</span>
        </PageButton>

        <PageInfo>
          {page + 1} / {totalPages}
        </PageInfo>

        <PageButton
          disabled={page === totalPages - 1 || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          <span className="material-symbols-outlined">arrow_right</span>
        </PageButton>
      </Pagination>
    </PageWrapper>
  );
}
