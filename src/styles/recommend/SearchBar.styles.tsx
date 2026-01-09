// src/styles/SearchBar.styles.ts
import styled from "styled-components";

export const SearchInput = styled.input`
  height: 48px;
  padding: 0 14px;

  border-radius: 12px;
  border: 1px solid #d0d0d0;
  width: 100%;

  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ec4899;
    box-shadow: 0 0 0 2px rgba(251, 217, 238, 0.418);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;
