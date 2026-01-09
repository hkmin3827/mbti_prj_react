import styled from "styled-components";

export const ButtonComponent = styled.button`
  margin-top: 12px;
  height: 50px;

  border-radius: 14px;
  border: none;

  background: linear-gradient(160deg, #f7af9d 30%, #b76a7f 80%, #d29aa8 100%);

  border: 1.5px solid rgba(255, 255, 255, 0.35);

  color: #5a2d38;
  font-size: 17px;
  font-weight: 600;

  cursor: pointer;

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(183, 106, 127, 0.8);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 10px rgba(192, 132, 151, 0.25);
  }
`;
