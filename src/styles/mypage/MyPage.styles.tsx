import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 50px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Section = styled.section`
  margin-bottom: 60px;
  background-color: #c9c9c996;
  padding: 30px;
  padding-top: 15px;
  border-radius: 30px;
  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding: 15px 20px;
  }
`;

export const ItemRow = styled.div`
  display: flex;
  gap: 12px;
  overflow: visible;
  padding-top: 8px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AllButton = styled.button`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
export const Title = styled.h2`
  font-size: 20px;
  margin-left: 15px;

  span {
    @media (max-width: 768px) {
      display: block;
    }
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-left: 0;
  }
`;
