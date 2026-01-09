import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { LayoutContainer, Main } from "../../styles/Layout.styles";

export default function Layout() {
  return (
    <LayoutContainer>
      <TopBar />
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  );
}
