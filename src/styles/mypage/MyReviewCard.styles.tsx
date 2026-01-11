import styled from "styled-components";

export const Inner = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
`;

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  margin-bottom: 6px;
  min-width: 0;
`;

export const PlaceName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2px;

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

export const Sub = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`;

export const VerifiedBadge = styled.span`
  font-size: 20px;
  color: #16a34a;
  display: inline-flex;
  align-items: center;
`;

export const Content = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #374151;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  margin: 4px 0 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  gap: 16px;
  margin-top: 10px;
`;

export const MetaText = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const ImageArea = styled.div<{ $hasImage: boolean }>`
  width: 140px;
  border-radius: 14px;
  flex-shrink: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  background: ${({ $hasImage }) => ($hasImage ? "transparent" : "transparent")};

  @media (max-width: 768px) {
    display: none;
    min-height: 0;
    margin-bottom: 40px;
  }
`;
export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
