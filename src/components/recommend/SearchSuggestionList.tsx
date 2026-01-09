import type { KakaoPlace } from "../../types/kakaoPlace";
import {
  SuggestionWrapper,
  SuggestionItem,
  SuggestionEmpty,
} from "../../styles/recommend/SearchSuggestion.styles";

interface Props {
  items: KakaoPlace[];
  onSelect: (p: KakaoPlace) => void;
}

export function SearchSuggestionList({ items, onSelect }: Props) {
  if (!items) return null;

  if (items.length === 0) {
    return <SuggestionEmpty>검색 결과가 없습니다.</SuggestionEmpty>;
  }

  return (
    <SuggestionWrapper>
      {items.map((p) => (
        <SuggestionItem key={p.id} onClick={() => onSelect(p)}>
          <strong>{p.name}</strong>
          <span>{p.address}</span>
        </SuggestionItem>
      ))}
    </SuggestionWrapper>
  );
}
