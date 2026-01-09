import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { UserContext } from "../../context/UserContext";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const { fetchMe } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      alert("로그인에 실패했습니다.");
      return;
    }
    const processOAuthLogin = async () => {
      try {
        setToken(token);

        const me = await fetchMe();

        if (!me.profileCompleted) {
          navigate("/profile/create", { replace: true });
        } else {
          navigate("/recommend", { replace: true });
        }
      } catch {
        navigate("/login", { replace: true });
      }
    };

    processOAuthLogin();
  }, [navigate, setToken, fetchMe]);

  return null;
};

export default OAuthCallback;
