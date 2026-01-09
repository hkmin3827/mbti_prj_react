import styled from "styled-components";

export const Page = styled.div`
  height: calc(100vh - 100px);
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const Card = styled.div`
  width: 90%;
  height: 90vh;
  margin: auto;
  max-width: 900px;
  background: black;
  border-radius: 24px;
  padding: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 32px;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MbtiRow = styled.div`
  display: flex;
  gap: 32px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f9a8d4;
    border-radius: 3px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Section = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Divider = styled.div`
  width: 1px;
  background: #e5e7eb;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubmitButton = styled.button`
  align-self: flex-end;

  width: 200px;
  height: 48px;
  border-radius: 999px;
  border: none;
  margin-top: auto;
  background: linear-gradient(135deg, #d665a5, #c23783, #d13495);
  color: white;
  font-size: 15px;
  font-weight: 600;
  align-items: center;
  gap: 6px;
  display: inline-flex;
  justify-content: center;

  cursor: pointer;
  box-shadow: 0 6px 14px rgba(236, 72, 153, 0.25);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(236, 72, 153, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    width: 30%;
    height: 35px;
  }
`;
