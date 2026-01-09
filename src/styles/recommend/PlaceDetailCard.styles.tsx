import styled from "styled-components";

export const DetailCard = styled.div`
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

export const ReactionContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const ReactionButton = styled.button<{ $active: boolean }>`
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  border: none;
  border: 1px solid ${({ $active }) => ($active ? "#facc15" : "#e5e7eb")};

  background-color: ${({ $active }) =>
    $active ? "rgba(250, 204, 21, 0.15)" : "#ffffff"};

  color: ${({ $active }) => ($active ? "#92400e" : "#374151")};

  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "rgba(250, 204, 21, 0.25)" : "#f9fafb"};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;

export const RatingRow = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const Info = styled.p`
  font-size: 14px;
  color: #374151;
`;

export const BookMarkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
`;
