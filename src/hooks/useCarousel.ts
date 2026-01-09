import { useState } from "react";

export function useCarousel<T>(items: T[], visibleCount: number) {
  const [startIndex, setStartIndex] = useState(0);

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < items.length;

  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  const prev = () => {
    if (canPrev) setStartIndex((v) => v - 1);
  };

  const next = () => {
    if (canNext) setStartIndex((v) => v + 1);
  };

  return {
    visibleItems,
    canPrev,
    canNext,
    prev,
    next,
  };
}
