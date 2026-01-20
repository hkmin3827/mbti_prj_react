import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Overlay,
  Drawer,
  Header,
  CloseButton,
  Body,
  Title,
  Meta,
  ImageRow,
  Content,
  EditButton,
  CancelButton,
} from "../../styles/review/ReviewDetailDrawer.styles";
import { getReviewDetailApi, type ReviewResponse } from "../../api/review.api";
import { deleteReviewApi } from "../../api/review.api";
import { ReviewEditModal } from "../../components/review/ReviewEditModal";
import { increaseReviewViewCountApi } from "../../api/view.api";

export default function ReviewDetailDrawer() {
  const navigate = useNavigate();
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const { reviewId } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const location = useLocation();

  const pageBackground = location.state?.background;

  useEffect(() => {
    if (!reviewId) return;

    getReviewDetailApi(Number(reviewId))
      .then(setReview)
      .catch(() => navigate(-1));
  }, [reviewId, navigate]);

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  useEffect(() => {
    if (!review) return;

    // 내가 쓴 리뷰면 조회수 증가 안 함
    if (review.mine) return;

    increaseReviewViewCountApi(review.id);
  }, [review]);
  if (!review) return null;

  return (
    <Overlay onClick={() => navigate(-1)}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            {review.place.name}{" "}
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/places/${review.place.id}`, {
                  replace: true, // 리뷰 드로어 제거
                  state: {
                    background: pageBackground, // 항상 페이지
                  },
                });
              }}
            >
              장소 정보
            </span>
          </Title>

          <div style={{ display: "flex", gap: "8px" }}>
            {review.mine && (
              <>
                <EditButton onClick={() => setIsEditOpen(true)}>
                  수정
                </EditButton>
                <CancelButton
                  onClick={async () => {
                    if (!confirm("리뷰를 삭제할까요?")) return;
                    await deleteReviewApi(review.id);
                    alert("리뷰가 삭제되었습니다.");

                    navigate(0);
                  }}
                >
                  삭제
                </CancelButton>
              </>
            )}

            <CloseButton onClick={() => navigate(-1)}>✕</CloseButton>
          </div>
        </Header>

        {isEditOpen && (
          <ReviewEditModal
            review={review}
            onClose={() => setIsEditOpen(false)}
            onSuccess={() => {
              setIsEditOpen(false);
              window.location.reload(); // 단순 리프레시 (원하면 상태 갱신으로 교체 가능)
            }}
          />
        )}
        <Body>
          <Meta>{review.place.address}</Meta>
          <Meta>
            {review.rating}⭐ ·{" "}
            {new Date(review.createdAt).toLocaleDateString()} · 조회{" "}
            {review.viewCount}
          </Meta>
          {review.reviewImageUrl && (
            <ImageRow>
              <img src={review.reviewImageUrl} alt="review" />
            </ImageRow>
          )}

          <Content>{review.content}</Content>
        </Body>
      </Drawer>
    </Overlay>
  );
}
