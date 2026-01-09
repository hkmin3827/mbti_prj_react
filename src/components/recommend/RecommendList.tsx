import type { KakaoPlace } from "../../types/kakaoPlace";
import {
  ListWrapper,
  PlaceItem,
  PageButton,
  ButtonWrapper,
} from "../../styles/recommend/RecommendList.styles";

interface Props {
  places: KakaoPlace[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelect: (p: KakaoPlace) => void;
}

export function RecommendList({
  places,
  page,
  totalPages,
  onPageChange,
  onSelect,
}: Props) {
  return (
    <div>
      <ListWrapper>
        {places.map((p) => (
          <PlaceItem key={p.id} onClick={() => onSelect(p)}>
            <strong>{p.name}</strong>
            <span>{p.address}</span>
          </PlaceItem>
        ))}
      </ListWrapper>
      {totalPages > 1 && (
        <ButtonWrapper>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PageButton
              key={i}
              onClick={() => onPageChange(i)}
              style={{
                background: page === i ? "#ec4899" : "#fff",
                color: page === i ? "#fff" : "#333",
              }}
            >
              {i + 1}
            </PageButton>
          ))}
        </ButtonWrapper>
      )}
    </div>
  );
}
