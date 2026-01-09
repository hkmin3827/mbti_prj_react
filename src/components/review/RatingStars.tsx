import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  rating: number; // 1 ~ 5
}

export function RatingStars({ rating }: Props) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? (
          <FaStar key={i} color="#f59e0b" size={14} />
        ) : (
          <FaRegStar key={i} color="#d1d5db" size={14} />
        )
      )}
    </div>
  );
}
