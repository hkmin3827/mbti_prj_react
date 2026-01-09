// src/pages/HomePage.tsx
import { useContext, useEffect, useState } from "react";
import {
  getMostViewedPlacesByMbti,
  getMostReviewedPlaces,
  type PlaceViewCountResponse,
} from "../api/home.api";
import { UserContext } from "../context/UserContext";
import {
  HomeContainer,
  TopRow,
  LeftPanel,
  RightPanel,
  Card,
  CardTitle,
  CardList,
  CardItem,
  BottomCard,
  BottomTitle,
  BottomList,
  BottomItem,
  LeftSideText,
  RightSideText,
  RankBadge,
  LeftIcon,
  RightIcon,
} from "../styles/HomePage.styles";
import type { PlaceResponse } from "../types/placeResponse";
import { ThinDivider } from "../styles/review/ReviewWriteModal.styles";
import { useLocation, useNavigate } from "react-router-dom";
import heart360 from "../assets/images/heart_cylinder_rotate_240_3sec.png";

export default function HomePage() {
  const { user } = useContext(UserContext);

  const [selfPlaces, setSelfPlaces] = useState<PlaceViewCountResponse[]>([]);
  const [partnerPlaces, setPartnerPlaces] = useState<PlaceViewCountResponse[]>(
    []
  );
  const [reviewPlaces, setReviewPlaces] = useState<PlaceResponse[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;

    getMostViewedPlacesByMbti(user.mbti, 5).then((res) => {
      console.log("SELF PLACES", res);
      setSelfPlaces(res);
    });

    if (user.partnerMbti) {
      getMostViewedPlacesByMbti(user.partnerMbti, 5).then(setPartnerPlaces);
    }

    getMostReviewedPlaces(5).then(setReviewPlaces);
  }, [user]);

  return (
    <HomeContainer>
      <TopRow>
        <LeftPanel>
          <Card>
            <CardTitle>{user?.mbti}가 많이 본 플레이스 TOP5</CardTitle>
            <ThinDivider />
            <CardList>
              {selfPlaces
                .filter((item) => item.place)
                .map(({ place }, index) => (
                  <CardItem
                    key={place.id}
                    onClick={() =>
                      navigate(`/places/${place.id}`, {
                        state: { background: location },
                      })
                    }
                  >
                    {index < 3 && (
                      <RankBadge $rank={index}>
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </RankBadge>
                    )}

                    {place.name}
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {place.address}
                    </span>
                  </CardItem>
                ))}
            </CardList>
          </Card>

          <LeftSideText>
            <LeftIcon className="material-symbols-outlined">
              arrow_back_ios
            </LeftIcon>
            <div>
              데이트, 어디에서 할까? 고민하시지마세요.
              <br />
              연인들의 MBTI에 맞춰 추천해드립니다.
              <br />
              What's your Lover's MBTI?
            </div>
            <RightIcon className="material-symbols-outlined">
              arrow_forward_ios
            </RightIcon>
          </LeftSideText>
        </LeftPanel>

        <RightPanel>
          <RightSideText>
            <img src={heart360} alt="rotating heart" />
          </RightSideText>

          <Card>
            {user?.partnerMbti ? (
              <>
                <CardTitle>
                  {user.partnerMbti}가 많이 본 플레이스 TOP5
                </CardTitle>
                <ThinDivider />

                <CardList>
                  {partnerPlaces
                    .filter((item) => item.place)
                    .map(({ place }, index) => (
                      <CardItem
                        key={place.id}
                        onClick={() =>
                          navigate(`/places/${place.id}`, {
                            state: { background: location },
                          })
                        }
                      >
                        {index < 3 && (
                          <RankBadge $rank={index}>
                            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                          </RankBadge>
                        )}
                        {place.name}
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {place.address}
                        </span>
                      </CardItem>
                    ))}
                </CardList>
              </>
            ) : (
              <CardTitle>
                연인의 MBTI를 설정하면
                <br />
                그에 맞는 추천 결과를 확인할 수 있어요.
              </CardTitle>
            )}
          </Card>
        </RightPanel>
      </TopRow>

      {/* 리뷰 TOP */}
      <BottomCard>
        <BottomTitle>리뷰가 많은 인기 플레이스 TOP5</BottomTitle>
        <ThinDivider />
        <BottomList>
          {reviewPlaces.map((p, index) => (
            <BottomItem
              key={p.id}
              onClick={() =>
                navigate(`/places/${p.id}`, {
                  state: { background: location },
                })
              }
            >
              {index < 3 && (
                <RankBadge $rank={index}>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                </RankBadge>
              )}
              <div>
                {p.name}
                <span style={{ fontSize: "12px", color: "#666" }}>
                  {" "}
                  {p.address}
                </span>
              </div>
              <div>
                <span style={{ fontSize: "12px", marginLeft: "auto" }}>
                  ⭐ {p.rating}
                </span>
              </div>
            </BottomItem>
          ))}
        </BottomList>
      </BottomCard>
    </HomeContainer>
  );
}
