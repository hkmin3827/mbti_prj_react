import styled from "styled-components";

export const BookMarkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
`;

export const ReviewSection = styled.section`
  margin-top: 24px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewTitle = styled.strong`
  font-size: 16px;
`;

export const ReviewMoreButton = styled.button`
  border: none;
  background: transparent;
  color: #4f46e5;
  font-size: 13px;
  cursor: pointer;
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

export const ReviewCard = styled.div`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #fafafa;
  cursor: pointer;
`;

export const ReviewRating = styled.div`
  font-size: 13px;
`;

export const ReviewContent = styled.div`
  font-size: 14px;
  margin-top: 6px;
  line-height: 1.4;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
