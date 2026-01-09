import type { PlaceResponse } from "../../types/placeResponse";
import { MyViewCard } from "../../styles/mypage/Card.styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Name,
  Category,
  Address,
  Rating,
  Inner,
} from "../../styles/mypage/ViewCard.styles";

export function PlaceHistoryCard({ place }: { place: PlaceResponse }) {
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
      <Inner>
        <Name>{place.name}</Name>
        <Category>{place.category}</Category>
        <Address>{place.address}</Address>
        <Rating>⭐ · {place.rating}</Rating>
      </Inner>
    </MyViewCard>
  );
}
