import { useEffect, useState } from "react";
import { ReviewSortSelector } from "../../components/review/ReviewSortSelector";
import { ReviewCard } from "../../components/review/ReviewCard";
import { ReviewWriteModal } from "../../components/review/ReviewWriteModal";
import { getReviewBoardApi, type ReviewResponse } from "../../api/review.api";
import {
  PageWrapper,
  TopRow,
  WriteButton,
  Pagination,
  PageButton,
  PageInfo,
  ReviewGrid,
} from "../../styles/review/ReviewPage.styles";

export default function ReviewPage() {
  const PAGE_SIZE = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState<"LATEST" | "VIEWS">("LATEST");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getReviewBoardApi(page, PAGE_SIZE, sort);
      setReviews(res.content);
      setTotalPages(res.totalPages);
    })();
  }, [sort, page]);

  return (
    <>
      <PageWrapper>
        <TopRow>
          <ReviewSortSelector value={sort} onChange={setSort} />
          <WriteButton onClick={() => setIsWriteOpen(true)}>
            리뷰 작성
          </WriteButton>
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
        {isWriteOpen && (
          <ReviewWriteModal
            onClose={() => setIsWriteOpen(false)}
            onSuccess={() => {
              setIsWriteOpen(false);
              getReviewBoardApi(0, PAGE_SIZE, sort).then((res) => {
                setReviews(res.content);
                setPage(0);
              });
            }}
          />
        )}
      </PageWrapper>
    </>
  );
}
