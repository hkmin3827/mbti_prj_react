import styled from "styled-components";

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const ArrowButton = styled.button`
  flex: 0 0 40px;
  height: 36px;
  border-radius: 999px;
  border: none;
  opacity: 0.9;
  background: #2b2a2a;
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: default;

    &:hover {
      opacity: 0.3;
      cursor: default;
    }
  }
  &:hover {
    opacity: 1;
    background: #000;
  }
`;
export const Viewport = styled.div`
  flex: 1;
  overflow: hidden;
  padding-top: 8px;
  overflow-x: auto;
`;

export const CardList = styled.div`
  display: flex;
  gap: 12px;
  min-height: 150px;
`;
