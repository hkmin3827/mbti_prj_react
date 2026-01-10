import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 300;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  position: relative;
  width: 50%;
  height: 80%;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 16px;
  }
`;
export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 32px 24px 96px; /* ⭐ 버튼 높이만큼 확보 */

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #f9a8d4;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Title = styled.h3`
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  resize: none;
  margin-bottom: 12px;
`;

export const ThinDivider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 12px 0;
`;
export const ButtonRow = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  width: 100%;
  padding: 16px 24px;

  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Section = styled.div`
  margin-bottom: 16px;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const PlusButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px dashed #aaa;
  background: #fff;
  font-size: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Icon = styled.span`
  font-size: 24px;
  line-height: 1;
`;

export const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  width: 300px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

export const Dropdown = styled.div`
  margin-top: 6px;
  max-height: 180px;
  overflow-y: auto;
  background: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #eef2ff;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`;
