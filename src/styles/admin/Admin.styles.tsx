import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  font-size: 14px;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: ${({ active }) => (active ? "#111827" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#111827")};
  cursor: pointer;
`;

export const SearchRow = styled.div`
  margin-bottom: 12px;
`;

export const Input = styled.input`
  width: 240px;
  padding: 6px 10px;
`;

export const Table = styled.table`
  background-color: white;
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px;
`;

export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #f3f4f6;
`;

export const ActionBtn = styled.button<{ danger?: boolean }>`
  padding: 4px 8px;
  border: none;
  background: ${({ danger }) => (danger ? "#ef4444" : "#3b82f6")};
  color: white;
  cursor: pointer;
`;

export const Pagination = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
`;
