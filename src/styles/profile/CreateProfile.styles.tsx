import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  gap: 24px;
  justify-content: center;
  align-items: center;

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
  width: 90%;
  height: 90vh;
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
export const PanelDescription = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  color: white;
  @media (max-width: 768px) {
    font-size: 12px;
  }
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

  width: 200px;
  height: 40px;

  border-radius: 999px;
  cursor: pointer;

  font-size: 14px;
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
  white-space: nowrap; /* 🔥 "이메일"이 줄바꿈 안 되도록 */
`;
export const ProfileInput = styled.input`
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;

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
  width: 200px;
  height: 200px;
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

export const Arrow = styled.span`
  font-size: 18px;
`;
