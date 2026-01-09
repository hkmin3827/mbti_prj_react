// src/styles/review/ReviewDetailDrawer.styles.ts
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 300;

  display: flex;
  justify-content: flex-end;
`;

export const Drawer = styled.aside`
  width: 42%;
  max-width: 640px;
  min-width: 360px;
  height: 100vh;
  background: #ffffff;
  animation: ${slideIn} 0.25s ease-out;

  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;
export const EditButton = styled.button`
  border-radius: 999px;
  width: 50px;
  height: 30px;
  border: none;
  background-color: #d13495;
  color: white;
  align-self: center;
  &:hover {
    background-color: #a52775;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    width: 40px;
    height: 25px;
  }
`;
export const CancelButton = styled.button`
  border-radius: 999px;
  width: 50px;
  height: 30px;
  border: none;
  background-color: #999;
  color: white;
  align-self: center;
  &:hover {
    background-color: #666;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    width: 40px;
    height: 25px;
  }
`;
export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

export const Body = styled.div`
  padding: 20px;
  overflow-y: auto;
`;

export const Meta = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  margin-top: auto;
`;

export const ImageRow = styled.div`
  aspect-ratio: 4 / 3;
  display: flex;
  gap: 10px;
  overflow: hidden;
  align-items: center;
  img {
    width: 80%;
    height: 80%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const Content = styled.p`
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;
