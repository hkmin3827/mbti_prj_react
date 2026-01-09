import styled from "styled-components";

export const PageWrapper = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  min-height: calc(100vh - 100px);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

export const TopRow = styled.div`
  margin-top: 30px;
  padding: 0 5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const WriteButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #d13495;

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #a52775;
  }
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: clamp(240px, 22vw, 340px);
  gap: clamp(16px, 2vw, 22px);
  min-height: 550px;
  width: 90%;

  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿: 2열 */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 모바일: 1열 */
    grid-auto-rows: auto;
  }
`;
export const Pagination = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const PageButton = styled.button`
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

    span {
      color: white;
    }
  }
  &:hover {
    opacity: 1;
    background: #000;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: black;
`;
