import styled from "styled-components";

export const SuggestionWrapper = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;

  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 999px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SuggestionItem = styled.div`
  padding: 12px 14px;
  cursor: pointer;

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
    background: #f9fafb;
  }

  & + & {
    border-top: 1px solid #f3f4f6;
  }
`;

export const SuggestionEmpty = styled.div`
  width: 100%;
  padding: 12px 14px;

  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  font-size: 12px;
  color: #6b7280;

  margin-top: 8px;
`;
