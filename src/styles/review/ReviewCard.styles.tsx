import styled from "styled-components";

export const Card = styled.article`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 18px;
  cursor: pointer;
  position: relative;

  display: flex;
  flex-direction: column;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 12px;
    max-height: 250px;
  }
`;
export const CardGrid = styled.div`
  display: grid;
  min-height: 170px;

  grid-template-columns: 1.2fr 1fr; /* 왼쪽 넓게, 오른쪽 사진 */
  grid-template-rows: 1fr auto;
  gap: 10px;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 0.8fr; /* 모바일에서는 세로 */
  }
`;
export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
`;
export const Header = styled.div`
  font-weight: 400;
`;

export const PlaceName = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #111827;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
export const Address = styled.p`
  font-size: 12.5px;
  color: #6b7280;
  line-height: 1.4;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VerifiedBadge = styled.span`
  font-size: 22px;

  color: #16a34a;

  display: inline-flex;
  align-items: center;
`;

export const Sub = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const WriterName = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 13.5px;
  }
`;

export const MbtiBadge = styled.span`
  padding: 3px 10px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;

  background: #000000;
  color: #d13495;

  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const PartnerMbtiBadge = styled.span`
  padding: 3px 10px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;

  background: #d13495;
  color: #000;

  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const Content = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-line;
  padding-bottom: 10px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  flex-grow: 1;
  @media (max-width: 1048px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const MetaRow = styled.div`
  position: absolute;
  right: 18px;
  bottom: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  .mbti-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;
export const MetaText = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const ImageArea = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 이미지 없을 때도 공간 유지 */
  background: ${({ $hasImage }) => ($hasImage ? "transparent" : "transparent")};

  @media (max-width: 768px) {
    min-height: 0;
    margin-bottom: 40px;
  }
`;
export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 6px;
  z-index: 10;

  @media (max-width: 768px) {
    max-height: 220px;
    border-radius: 10px;
  }
`;
export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  gap: 20px;
`;
