import styled from "styled-components";

export const PageGrid = styled.div<{ $hasDetail: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasDetail }) =>
    $hasDetail ? "7fr 3fr" : "1fr"};
  gap: 24px;
  padding: 24px;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const RightPanel = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  position: relative;

  /* 🔥 모바일 */
  @media (max-width: 768px) {
    position: fixed;
    top: 64px; /* TopBar 높이 */
    left: 0;
    right: 0;
    bottom: 0;

    width: 100vw;
    height: calc(100vh - 64px);

    z-index: 200;
    background: white;
  }
`;
