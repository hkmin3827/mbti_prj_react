import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100px;
  background-color: black;

  border-bottom: 1px solid #e0d6cc;

  padding-right: 6px;

  @media (max-width: 768px) {
    height: 80px;
  }
`;

export const Inner = styled.div`
  width: calc(100vw - 6px);
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-right: 6px;

  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Logo = styled.div`
  margin-left: 30px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  z-index: 2; /* Nav 위로 올라오게 */

  @media (max-width: 768px) {
    margin: 0;
  }
`;
export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
export const LogoText = styled.span`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.2px;

  color: rgba(255, 255, 255, 0.85);

  @media (max-width: 768px) {
    display: none; /* 모바일에서는 숨김 */
  }
`;
export const Center = styled.div`
  width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: static; /* ⭐ 핵심 */
    transform: none;
    width: auto;
    margin-left: auto; /* 프로필과 거리 확보 */

    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 120px;
  align-items: center;

  @media (max-width: 1048px) {
    gap: 30px;
    margin-left: auto;
  }
  @media (max-width: 768px) {
    gap: 12px;
    margin-left: auto;
  }
`;

export const Tab = styled(NavLink)`
  font-size: 18px;
  font-weight: 500;
  color: #e8e8e8;
  text-decoration: none;
  padding: 6px 10px;

  &.active {
    color: #ffffff;
    border-bottom: 1px solid white;
    font-weight: 700;
  }
  &:hover {
    color: #ffffff;

    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6),
      0 0 12px rgba(255, 200, 215, 0.45);
  }

  @media (max-width: 1048px) {
    font-size: 16px;
    padding: 6px 8px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;
export const StaticTab = styled.div<{ $active: boolean; $open: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: #e8e8e8;
  text-decoration: none;
  padding: 6px 10px;
  cursor: pointer;

  &:hover {
    color: #ffffff;

    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6),
      0 0 12px rgba(255, 200, 215, 0.45);
  }
  ${({ $active }) =>
    $active &&
    `
    border-bottom: 1px solid #fff;
    font-weight: 700;
    color: #fff;
  `}
  ${({ $open }) =>
    $open &&
    `
    color: #ffffff;

    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6),
      0 0 12px rgba(255, 200, 215, 0.45);
    `}


  @media (max-width: 1048px) {
    font-size: 14px;
    padding: 6px 8px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;
export const Dropdown = styled.div`
  position: absolute;
  top: 30%;
  left: -15%;
  min-width: 120px;
  padding: 13px 0;
  margin-top: 8px;

  display: flex;
  gap: 20px;

  background: transparent;
  border: none;
  border-radius: 12px;

  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 200;

  @media (max-width: 1048px) {
    gap: 0;
  }

  @media (max-width: 768px) {
    gap: 0;
    left: -10%;
    padding: 4px 0;
  }
`;

export const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;

  opacity: 0.75;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px); /* 살짝 떠오르는 느낌 */
  }

  @media (max-width: 1048px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 10px 10px;
  }
`;
export const DropdownWrapper = styled.div`
  position: relative;
  align-items: center;

  &:hover > div {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
`;
export const Right = styled.div`
  width: 300px; /* 균형용, 실제 콘텐츠 없음 */
`;

export const ProfileWrapper = styled.div`
  margin-left: auto;
  margin-right: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  background: #222;
  border: 1px solid rgba(255, 255, 255, 0.35);

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 10px rgba(255, 200, 215, 0.45);
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
  }
`;
/* 햄버거 버튼 */
export const HamburgerButton = styled.button`
  display: none;
  margin-left: 7px;
  font-size: 28px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

/* 오버레이 */
export const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease;
`;

/* 우측 슬라이드 메뉴 */
export const MobileMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 220px;
  height: 100%;
  background: #000;
  padding: 100px 20px;
  z-index: 300;

  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.3s ease;
`;

/* 메뉴 아이템 */
export const MobileMenuItem = styled.div<{ $active?: boolean }>`
  font-size: 18px;
  padding: 20px 0;
  cursor: pointer;

  color: ${({ $active }) => ($active ? "#ffffff" : "#e8e8e8")};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};

  text-shadow: ${({ $active }) =>
    $active
      ? "0 0 8px rgba(255,255,255,0.6), 0 0 12px rgba(255,200,215,0.45)"
      : "none"};

  transition: color 0.2s ease, font-weight 0.2s ease, text-shadow 0.25s ease;
`;

/* 서브메뉴 */
export const MobileSubMenu = styled.div<{ $open: boolean }>`
  margin-left: 12px;
  margin-bottom: 12px;

  max-height: ${({ $open }) => ($open ? "200px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "-8px")});
`;

/* 서브 아이템 */
export const MobileSubItem = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  padding: 8px 0;
  cursor: pointer;
`;

export const MobileCloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;

  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
