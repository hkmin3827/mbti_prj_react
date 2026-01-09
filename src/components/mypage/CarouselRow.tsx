import type { ReactNode } from "react";
import {
  RowWrapper,
  ArrowButton,
  CardList,
  Viewport,
} from "../../styles/mypage/Carousel.styles";

interface Props {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  children: ReactNode;
}

export function CarouselRow({
  canPrev,
  canNext,
  onPrev,
  onNext,
  children,
}: Props) {
  return (
    <RowWrapper>
      <ArrowButton disabled={!canPrev} onClick={onPrev}>
        <span className="material-symbols-outlined">arrow_left</span>
      </ArrowButton>

      <Viewport>
        <CardList>{children}</CardList>
      </Viewport>
      <ArrowButton disabled={!canNext} onClick={onNext}>
        <span className="material-symbols-outlined">arrow_right</span>
      </ArrowButton>
    </RowWrapper>
  );
}
