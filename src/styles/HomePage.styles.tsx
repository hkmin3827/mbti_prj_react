// src/styles/HomePage.styles.ts
import styled from "styled-components";

/* 전체 */
export const HomeContainer = styled.div`
  margin: 0 auto;
  padding: 100px 60px;

  @media (max-width: 768px) {
    padding: 40px;
  }
`;

/* 상단 행 */
export const TopRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 2px;
  margin-bottom: 80px;

  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    padding-top: 0;
    margin-bottom: 40px;
  }
`;

/* 공통 패널 베이스 */
const PanelBase = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* LEFT / RIGHT */
export const LeftPanel = styled(PanelBase)`
  display: flex;
  flex-direction: column;
  width: 45%;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const RightPanel = styled(PanelBase)`
  display: flex;
  flex-direction: column;
  width: 45%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

/* 카드 */
export const Card = styled.div`
  width: 80%;
  border-radius: 28px;
  padding: 40px;
  background-color: #c9c9c996;

  min-height: 500px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px;
    min-height: 100px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0;
  @media (max-width: 768px) {
    margin: 0;
    font-size: 14px;
  }
`;

export const CardList = styled.ul`
  list-style: none;
  padding: 6px 0 0 0;
  margin: 0;
  flex: 1;

  cursor: pointer;
  display: grid;
  gap: 10px;
  overflow-y: auto;
  @media (max-width: 768px) {
    flex: 0;
    gap: 20px;
  }
`;
export const RankBadge = styled.div<{ $rank: number }>`
  position: absolute;
  top: -10px;
  left: -10px;

  font-size: 22px;
  z-index: 5;
  background-color: transparent;
  padding: 4px;
`;

export const CardItem = styled.li`
  position: relative;
  border-radius: 14px;
  padding: 10px 14px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  background: #fafafa;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px); /* ⭐ 위로 살짝 */
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 12px;
    height: 70px;
  }
`;

const SideTextBase = styled.div`
  text-align: center;
  color: #000;
  line-height: 3;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;
export const LeftSideText = styled(SideTextBase)`
  height: 300px;
  font-size: 17px;
  font-weight: 700;

  @media (max-width: 1048px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const RightSideText = styled(SideTextBase)`
  height: 300px;
  @media (max-width: 768px) {
    display: none;
  }
  img {
    width: 120px;
    height: 120px;
    @media (max-width: 1048px) {
      width: 80px;
      height: 80px;
    }
  }
`;
export const LeftIcon = styled.span`
  display: block;
  font-size: 90px;
  font-weight: 200;
  margin-right: 20px;
  @media (max-width: 1048px) {
    font-size: 50px;
  }
`;
export const RightIcon = styled.span`
  display: block;
  font-size: 90px;
  font-weight: 200;
  margin-left: 20px;
  @media (max-width: 1048px) {
    font-size: 50px;
  }
`;
/* 하단 카드 */
export const BottomCard = styled.div`
  width: 90%;
  margin: 0 auto;
  min-height: 140px;
  border-radius: 40px;
  padding: 24px 40px;
  background-color: #c9c9c996;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BottomTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const BottomList = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

export const BottomItem = styled.li`
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 18px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px); /* ⭐ 위로 살짝 */
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 12px;
  }
`;
