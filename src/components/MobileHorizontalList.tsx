import styled from "styled-components";
import type { ReactNode } from "react";

export function MobileHorizontalList({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 4px 12px;

  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;
