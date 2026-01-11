import {
  LikeBadge,
  LikeBadgeWrapper,
  MyViewCard,
} from "../../styles/mypage/Card.styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Name,
  Category,
  Address,
  Rating,
  Inner,
} from "../../styles/mypage/ViewCard.styles";
import type { PlaceResponse } from "../../types/placeResponse";

export function MyLikesCard({ place }: { place: PlaceResponse }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MyViewCard
      onClick={() =>
        navigate(`/places/${place.id}`, {
          state: { background: location },
        })
      }
    >
      {(place.likedContexts?.length ?? 0) > 0 && (
        <LikeBadgeWrapper>
          {place.likedContexts?.includes("SELF") && (
            <LikeBadge title="나">🖤</LikeBadge>
          )}
          {place.likedContexts?.includes("PARTNER") && (
            <LikeBadge title="연인">🩷</LikeBadge>
          )}
        </LikeBadgeWrapper>
      )}
      <Inner>
        <Name>{place.name}</Name>
        <Category>{place.category}</Category>
        <Address>{place.address}</Address>
        <Rating>⭐ {place.rating ?? "-"}</Rating>
      </Inner>
    </MyViewCard>
  );
}
