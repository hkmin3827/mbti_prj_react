import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 17px;
  margin-bottom: 40px;
  color: white;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    border-bottom: 1px solid #fff;
  }
`;

export const Required = styled.span`
  color: #e11d48;
  margin-left: 4px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Label = styled.label<{ $checked: boolean }>`
  padding: 5% 0;
  text-align: center;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;

  background: ${({ $checked }) =>
    $checked ? "linear-gradient(135deg,#f9a8d4,#fbcfe8)" : "#f3f4f6"};

  border: ${({ $checked }) =>
    $checked ? "1px solid #ec4899" : "1px solid #e5e7eb"};

  input {
    display: none;
  }
`;
