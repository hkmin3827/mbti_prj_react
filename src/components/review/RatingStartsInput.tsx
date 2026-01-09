import { FaStar } from "react-icons/fa";

interface Props {
  rating: number;
  onChange: (v: number) => void;
}

export function RatingStarsInput({ rating, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={20}
          color={i < rating ? "#f59e0b" : "#e5e7eb"}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(i + 1)}
        />
      ))}
    </div>
  );
}
