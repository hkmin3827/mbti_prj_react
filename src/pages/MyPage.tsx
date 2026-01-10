import { useEffect, useState } from "react";
import {
  getMyBookMarksApi,
  getMyLikesApi,
  getMyReviewsApi,
  getMyViewHistoryApi,
} from "../api/mypage.api";
import type { ReviewResponse } from "../api/review.api";
import type { PlaceResponse } from "../types/placeResponse";
import { useCarousel } from "../hooks/useCarousel";
import {
  PageWrapper,
  Section,
  SectionHeader,
  HeaderRight,
  AllButton,
  Title,
} from "../styles/mypage/MyPage.styles";
import { CarouselRow } from "../components/mypage/CarouselRow";
import { PlaceHistoryCard } from "../components/mypage/PlaceHistoryCard";
import { MyReviewCard } from "../components/mypage/MyReviewCard";
import { useNavigate } from "react-router-dom";
import { BookMarkCard } from "../components/mypage/BookMarkCard";
import { MyLikesCard } from "../components/mypage/MyLikesCard";

export default function MyPage() {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [viewHistories, setViewHistories] = useState<PlaceResponse[]>([]);
  const [bookMarks, setBookMarks] = useState<PlaceResponse[]>([]);
  const [likes, setLikes] = useState<PlaceResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyReviewsApi(0, 20).then((res) => {
      setReviews(res.content);
    });
    getMyViewHistoryApi().then(setViewHistories);
    getMyBookMarksApi().then(setBookMarks);
    getMyLikesApi().then(setLikes);
  }, []);
  const reviewCarousel = useCarousel(reviews, 3);
  const viewHistoryCarousel = useCarousel(viewHistories, 6);
  const bookMarkCarousel = useCarousel(bookMarks, 6);
  const likesCarousel = useCarousel(likes, 6);

  return (
    <PageWrapper>
      {/* 조회 이력 */}
      <Section>
        <Title>👀 최근 본 플레이스</Title>

        <CarouselRow
          canPrev={viewHistoryCarousel.canPrev}
          canNext={viewHistoryCarousel.canNext}
          onPrev={viewHistoryCarousel.prev}
          onNext={viewHistoryCarousel.next}
        >
          {viewHistoryCarousel.visibleItems.map((place) => (
            <PlaceHistoryCard key={place.id} place={place} />
          ))}
        </CarouselRow>
      </Section>

      <Section>
        <Title>
          ❤️ 좋아하는 플레이스
          <span style={{ fontSize: "13px", marginLeft: "20px" }}>
            🖤 you 🩷 lover
          </span>
        </Title>

        <CarouselRow
          canPrev={likesCarousel.canPrev}
          canNext={likesCarousel.canNext}
          onPrev={likesCarousel.prev}
          onNext={likesCarousel.next}
        >
          {likesCarousel.visibleItems.map((place) => (
            <MyLikesCard key={place.id} place={place} />
          ))}
        </CarouselRow>
      </Section>

      <Section>
        <Title>
          ⭐ 저장한 플레이스{" "}
          <span style={{ fontSize: "13px", marginLeft: "20px" }}>
            🖤 you 🩷 lover
          </span>
        </Title>

        <CarouselRow
          canPrev={bookMarkCarousel.canPrev}
          canNext={bookMarkCarousel.canNext}
          onPrev={bookMarkCarousel.prev}
          onNext={bookMarkCarousel.next}
        >
          {bookMarkCarousel.visibleItems.map((place) => (
            <BookMarkCard key={place.id} place={place} />
          ))}
        </CarouselRow>
      </Section>

      <Section>
        <SectionHeader>
          <Title>💬 내 리뷰</Title>

          <HeaderRight>
            <AllButton onClick={() => navigate("/reviews/me")}>
              전체보기
            </AllButton>
          </HeaderRight>
        </SectionHeader>

        <CarouselRow
          canPrev={reviewCarousel.canPrev}
          canNext={reviewCarousel.canNext}
          onPrev={reviewCarousel.prev}
          onNext={reviewCarousel.next}
        >
          {reviewCarousel.visibleItems.map((review) => (
            <MyReviewCard key={review.id} review={review} />
          ))}
        </CarouselRow>
      </Section>
    </PageWrapper>
  );
}
