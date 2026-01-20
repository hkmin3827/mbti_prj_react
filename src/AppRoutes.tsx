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
import PlaceReviews from "./pages/review/PlaceReviews";
import AdminRoute from "./guard/AdminRoute";
import AdminPage from "./pages/admin/AdminPage";
import { UserGate } from "./guard/UserGate";

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route path="/profile/mbtiselect" element={<CreateMbtiProfile />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<UserGate />}>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/recommend" element={<RecommendPage />} />
              <Route path="/places/:placeId" element={<PlaceDetailDrawer />} />
              <Route
                path="/places/:placeId/reviews"
                element={<PlaceReviews />}
              />
              <Route path="/reviews" element={<ReviewPage />} />
              <Route
                path="/reviews/:reviewId"
                element={<ReviewDetailDrawer />}
              />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/reviews/me" element={<MyReviews />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/mbtiedit" element={<EditMbtiProfile />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>

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
