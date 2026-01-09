import { useEffect, useState } from "react";
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
import { getMyReviewsApi } from "../../api/mypage.api";

export default function MyReviews() {
  const PAGE_SIZE = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getMyReviewsApi(page, PAGE_SIZE);
      setReviews(res.content);
      setTotalPages(res.totalPages);
    };

    fetchReviews();
  }, [page]);

  return (
    <>
      <PageWrapper>
        <TopRow style={{ justifyContent: "flex-start", margin: "0" }}>
          <Title>내가 작성한 리뷰</Title>
        </TopRow>

        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ReviewGrid>

        <Pagination>
          <PageButton
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <span className="material-symbols-outlined">arrow_left</span>
          </PageButton>

          <PageInfo>
            {page + 1} / {totalPages}
          </PageInfo>

          <PageButton
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <span className="material-symbols-outlined">arrow_right</span>
          </PageButton>
        </Pagination>
      </PageWrapper>
    </>
  );
}
