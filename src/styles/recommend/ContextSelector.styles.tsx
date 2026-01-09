import styled from "styled-components";

export const ContextWrapper = styled.div`
  display: flex;
  justify-content: center; /* 정가운데 */
  align-items: center;

  width: fit-content; /* 버튼 크기만큼만 */
  margin: 0 auto;

  border: 1px solid #d1d5db; /* 외곽 테두리 */
  border-radius: 12px;
  overflow: hidden; /* 내부 radius 깔끔하게 */
`;

export const FloatingContextWrapper = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 200; /* 지도 마커보다 위 */

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border-radius: 999px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
  }
`;

export const ContextButton = styled.button<{ $active: boolean }>`
  width: 140px; /* 버튼 width 줄이기 */
  height: 40px;

  border: none;
  border-right: 1px solid #d1d5db; /* 가운데 구분선 */

  background: ${({ $active }) => ($active ? "#d13495" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  transition: background-color 0.15s ease, color 0.15s ease;

  &:first-child {
    border-radius: 999px 0 0 999px;
  }
  &:last-child {
    border-right: none; /* 오른쪽 버튼 선 제거 */
    border-radius: 0 999px 999px 0;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#a52775" : "rgba(0,0,0,0.04)")};
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 35px;
  }
`;
