import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { LayoutContainer, Main } from "../../styles/Layout.styles";
import { useState } from "react";

export type LayoutOutletContext = {
  menuOpen: boolean;
};

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <LayoutContainer>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Main>
        <Outlet context={{ menuOpen }} />
      </Main>
    </LayoutContainer>
  );
}
