import type { Category } from "../../types/category";

interface Props {
  onSelect: (category: Category) => void;
}

export function GetRecommendHover({ onSelect }: Props) {
  return (
    <div className="recommend-hover">
      <button onClick={() => onSelect("CAFE")}>카페</button>
      <button onClick={() => onSelect("FOOD")}>맛집</button>
      <button onClick={() => onSelect("COURSE")}>그외</button>
    </div>
  );
}
