import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 100px);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ContextWrapper = styled.div`
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
`;

export const Panel = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  margin: auto;
  max-width: 900px;
  padding: 28px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

export const PanelTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: white;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: center;

  width: 150px;
  height: 38px;

  border-radius: 999px;
  cursor: pointer;
  margin-bottom: 20px;

  font-size: 13px;
  font-weight: 500;

  color: #fff;
  background: linear-gradient(135deg, #d665a5, #a33270);

  box-shadow: 0 6px 14px rgba(236, 72, 153, 0.25);

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(236, 72, 153, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(236, 72, 153, 0.2);
  }
  @media screen and (max-width: 768px) {
    width: 140px;
    height: 30px;
    font-size: 12px;
  }
`;

export const Label = styled.span`
  width: 70px; /* 라벨 가로폭 (원하면 80~90으로 조절 가능) */
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
  white-space: nowrap;
  margin-top: 10px;
`;
export const ProfileInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #c08497;
  }
`;
export const ErrorText = styled.p`
  margin-top: -8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #fff;
`;
export const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  background: #f3f4f6;
  align-self: center;

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const SubmitButton = styled.button`
  width: 200px;
  height: 48px;
  border-radius: 999px;
  border: none;
  margin-top: auto;
  background: linear-gradient(135deg, #d665a5, #c23783, #d13495);
  /* background: linear-gradient(135deg, #d13495, #f472b6); */
  color: white;
  font-size: 15px;
  font-weight: 600;
  align-items: center;
  align-self: flex-end;
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

  @media (max-width: 768px) {
    width: 30%;
    height: 35px;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const BasicInfo = styled.div`
  padding: 20px;
  border-right: 1px solid #fff;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    border-bottom: 1px solid #fff;
    border-right: none;
  }
`;
export const MbtiInfo = styled.div`
  flex: 1; /* ⭐ 핵심 */
  width: 100%;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const MbtiTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Mbti = styled.div`
  flex: 1; /* 반반 */
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center; /* 세로 중앙 */
  align-items: center; /* 가로 중앙 */
  gap: 9px;
`;
export const MbtiWrapper = styled.div`
  flex: 1; /* ⭐ 핵심 */
  display: flex;
  width: 100%;
  align-items: stretch; /* ⭐ 자식 높이 늘리기 */
`;

// 하단 왼쪽 (계정 탈퇴)
export const WithdrawButton = styled.button`
  position: absolute;
  left: 24px;
  bottom: 24px;

  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: #ef4444;
    text-decoration: underline;
  }
`;

// 상단 오른쪽 (로그아웃)
export const LogoutButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;

  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: #f472b6;
  }

  span {
    font-size: 16px;
  }
`;
