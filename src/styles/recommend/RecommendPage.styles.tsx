import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const MapWrapper = styled.div`
  flex: 2;
  position: relative;
  width: 100%;
  height: 400px;
`;

export const SearchBar = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  background: white;
  border-radius: 12px;
  display: flex;
  overflow: hidden;

  input {
    border: none;
    padding: 8px;
  }

  button {
    padding: 8px 12px;
    border: none;
    background: #ec4899;
    color: white;
    cursor: pointer;
  }
`;

export const ListPanel = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #fafafa;
`;

export const PlaceCard = styled.div`
  padding: 12px;
  border-radius: 12px;
  background: white;
  margin-bottom: 8px;
`;
