import styled from "styled-components";

export const Divider = styled.div`
  margin: 28px 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #fff;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #fff;
  }
`;

export const SocialLoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialLoginButton = styled.button<{
  provider: "google" | "kakao" | "naver";
}>`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-family: "Pretendard", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: normal;
  cursor: pointer;

  #google-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  #kakao,
  #naver {
    height: 100%;
  }

  ${({ provider }) => {
    switch (provider) {
      case "google":
        return `
          background: #ffffff;
          color: #1f1f1f;
          border: 1px solid #dadce0;
        `;
      case "kakao":
        return `
          background: #FEE500;
          color: #3C1E1E;
        `;
      case "naver":
        return `
          background: #03A94D;
          color: #ffffff;
        `;
    }
  }}
`;
