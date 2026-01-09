// src/AppRoutes.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RecommendPage from "./pages/RecommendPage";
import ReviewPage from "./pages/review/ReviewPage";
import MyPage from "./pages/MyPage";
import Layout from "./components/layout/Layout";
import CreateMbtiProfile from "./pages/profile/CreateMbtiProfile";
import CreateProfile from "./pages/profile/CreateProfile";
import OAuthCallback from "./pages/auth/OAuthCallback";
import ReviewDetailDrawer from "./pages/review/ReviewDetailDrawer";
import PlaceDetailDrawer from "./pages/PlaceDetailDrawer";
import MyReviews from "./pages/review/MyReviews";
import EditProfile from "./pages/profile/EditProfile";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./guard/ProtectedRoute";
import EditMbtiProfile from "./pages/profile/EditMbtiProfile";

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* 1️⃣ 배경 라우트 */}
      <Routes location={background || location}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route path="/profile/mbtiselect" element={<CreateMbtiProfile />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/places/:placeId" element={<PlaceDetailDrawer />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/reviews/:reviewId" element={<ReviewDetailDrawer />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/reviews/me" element={<MyReviews />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/mbtiedit" element={<EditMbtiProfile />} />
          </Route>
        </Route>
      </Routes>

      {/* 2️⃣ 드로어 라우트 */}
      {background && (
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/reviews/:reviewId" element={<ReviewDetailDrawer />} />
            <Route path="/places/:placeId" element={<PlaceDetailDrawer />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
