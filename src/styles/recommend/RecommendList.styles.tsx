// src/styles/RecommendList.styles.ts
import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PlaceItem = styled.div`
  padding: 14px 16px;
  border-radius: 12px;

  background: #ffffff;
  border: 1px solid #e5e7eb;

  cursor: pointer;
  transition: all 0.15s ease;

  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 14px;
    color: #111827;
  }

  span {
    font-size: 12px;
    color: #6b7280;
  }

  &:hover {
    background: #f1f0f0;
    border-color: #ec4899;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export const PageButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  cursor: pointer;
`;
