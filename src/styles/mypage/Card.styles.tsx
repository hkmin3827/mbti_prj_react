import styled from "styled-components";

export const MyViewCard = styled.div`
  position: relative;
  flex: 0 0 15%; /* 한 화면에 약 6개 */
  min-width: 15%;
  padding: 20px 15px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.95);
  margin: 0 auto;
  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px); /* ⭐ 위로 살짝 */
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 1200px) {
    flex: 0 0 50%;
    min-width: 20%;
  }

  @media (max-width: 768px) {
    flex: 0;
    min-width: 150px;
  }
`;

export const ReviewCard = styled.div`
  flex: 0 0 30%; /* 한 화면에 약 3개 */
  min-width: 15%;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.95);
  margin: 0 auto;
  cursor: pointer;
  min-height: 160px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px); /* ⭐ 위로 살짝 */
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 1200px) {
    flex: 0 0 20%;
    min-width: 20%;
  }

  @media (max-width: 768px) {
    flex: 0;
    min-width: 200px;
  }
`;
export const LikeBadgeWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  gap: 4px;

  z-index: 5;
`;
export const LikeBadge = styled.div`
  width: 22px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  line-height: 1;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;
