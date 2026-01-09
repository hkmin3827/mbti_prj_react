import styled from "styled-components";
import type React from "react";

type FormProps = React.ComponentPropsWithoutRef<"form">;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 24px;
`;

export const AuthHeader = styled.header`
  position: absolute;
  top: 24px;
  left: 24px;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

export const LogoImg = styled.img`
  width: 36px;
  height: 36px;
`;

export const LogoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;
export const SignupCard = styled.div`
  width: 100%;
  max-width: 420px;

  background: linear-gradient(
    160deg,
    rgba(243, 255, 189, 0.95),
    rgba(255, 255, 255, 0.95)
  );

  background: black;

  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 12px 30px rgba(255, 182, 193, 0.35),
    0 4px 10px rgba(0, 0, 0, 0.25);

  @media (max-width: 480px) {
    padding: 32px 20px;
    border-radius: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #fff;
  margin-bottom: 30px;
  cursor: default;
`;

export const SubTitle = styled.p`
  font-size: 14px;
  color: white;
  cursor: default;
  margin-bottom: 32px;
`;

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 14px;

  border-radius: 12px;
  border: 1px solid #ffffff;

  font-size: 12px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    opacity: 1; /* 🔥 Safari 대응 */
  }

  &::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.703);
  }

  &::-moz-placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  &:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
  &:focus {
    outline: none;
    border-color: #c08497;
    box-shadow: 0 0 0 2px rgba(192, 132, 151, 0.25);
  }
`;

export const SignupButton = styled.button`
  margin-top: 12px;
  height: 50px;

  border-radius: 14px;
  border: none;

  background: white;

  border: 1.5px solid rgba(255, 255, 255, 0.35);

  color: black;
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

export const FooterText = styled.p`
  margin-top: 24px;
  font-size: 13px;
  text-align: center;
  color: #fff;
  cursor: default;

  span {
    color: #f4a6a6;

    &:hover {
      color: #ff7aa2;
    }
    font-weight: 900;
    cursor: pointer;
  }
`;
