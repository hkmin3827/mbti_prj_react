import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Wrapper,
  Inner,
  Logo,
  Nav,
  StaticTab,
  Tab,
  DropdownItem,
  Dropdown,
  DropdownWrapper,
  LogoImg,
  LogoText,
  Center,
  ProfileWrapper,
  ProfileImage,
  HamburgerButton,
  MobileOverlay,
  MobileMenu,
  MobileMenuItem,
  MobileSubMenu,
  MobileSubItem,
  MobileCloseButton,
} from "../../styles/TopBar.styles";
import type { Category } from "../../types/category";
import { useContext, useState } from "react";
import logo from "../../assets/logos/3D하트.png";
import { UserContext } from "../../context/UserContext";

export default function TopBar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const isRecommendActive = location.pathname.startsWith("/recommend");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // mobile
  const [menuOpen, setMenuOpen] = useState(false);
  const [recommendOpen, setRecommendOpen] = useState(false);

  const handleSelectCategory = (category: Category) => {
    const context = params.get("context") ?? "SELF";

    navigate(`/recommend?category=${category}&context=${context}`);
    setRecommendOpen(false);
    setMenuOpen(false);
  };
  return (
    <Wrapper>
      <Inner>
        <Logo onClick={() => navigate("/")}>
          <LogoImg src={logo} alt="What'sLover Logo" />
          <LogoText>What's your Lover's MBTI?</LogoText>
        </Logo>

        <Center>
          <Nav>
            <DropdownWrapper
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <StaticTab $active={isRecommendActive} $open={isDropdownOpen}>
                Get Recommend
              </StaticTab>

              <Dropdown>
                <DropdownItem onClick={() => handleSelectCategory("CAFE")}>
                  카페
                </DropdownItem>
                <DropdownItem onClick={() => handleSelectCategory("FOOD")}>
                  맛집
                </DropdownItem>
                <DropdownItem onClick={() => handleSelectCategory("COURSE")}>
                  그 외
                </DropdownItem>
              </Dropdown>
            </DropdownWrapper>
            <Tab to="/reviews">Review</Tab>
            <Tab to="/mypage">My Page</Tab>
          </Nav>
        </Center>
        {user && (
          <ProfileWrapper onClick={() => navigate("/profile/edit")}>
            <ProfileImage
              src={user.profileImage}
              alt="profile"
              referrerPolicy="no-referrer"
            />
          </ProfileWrapper>
        )}

        <HamburgerButton
          onClick={() => {
            setMenuOpen(true);
            setRecommendOpen(false);
          }}
        >
          ☰
        </HamburgerButton>

        {/* 모바일 오버레이 */}
        <MobileOverlay
          $open={menuOpen}
          onClick={() => {
            setMenuOpen(false);
            setRecommendOpen(false);
          }}
        >
          <MobileMenu $open={menuOpen} onClick={(e) => e.stopPropagation()}>
            <MobileCloseButton
              onClick={() => {
                setMenuOpen(false);
                setRecommendOpen(false);
              }}
            >
              ✕
            </MobileCloseButton>
            <MobileMenuItem
              $active={recommendOpen}
              onClick={() => setRecommendOpen((prev) => !prev)}
            >
              Get Recommend
            </MobileMenuItem>

            <MobileSubMenu $open={recommendOpen}>
              <MobileSubItem onClick={() => handleSelectCategory("CAFE")}>
                카페
              </MobileSubItem>
              <MobileSubItem onClick={() => handleSelectCategory("FOOD")}>
                맛집
              </MobileSubItem>
              <MobileSubItem onClick={() => handleSelectCategory("COURSE")}>
                그 외
              </MobileSubItem>
            </MobileSubMenu>

            <MobileMenuItem
              onClick={() => {
                setMenuOpen(false);
                setRecommendOpen(false);
                navigate("/reviews");
              }}
            >
              Review
            </MobileMenuItem>

            <MobileMenuItem
              onClick={() => {
                setMenuOpen(false);
                setRecommendOpen(false);
                navigate("/mypage");
              }}
            >
              My Page
            </MobileMenuItem>
          </MobileMenu>
        </MobileOverlay>
      </Inner>
    </Wrapper>
  );
}
