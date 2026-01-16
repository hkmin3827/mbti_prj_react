import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { UserContext } from "../../context/UserContext";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { fetchMe } = useContext(UserContext);

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    console.log("AccessToken", accessToken);
  }, [accessToken]);
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

        if (!me.isActive) {
          clearAuth();
          alert("비활성화된 계정입니다. 관리자에게 문의하세요.");
          navigate("/login", { replace: true });
          return;
        }

        setUser({
          id: me.id,
          email: me.email,
          role: me.role,
        });

        if (!me.profileCompleted) {
          navigate("/profile/create", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch {
        alert("로그인 중 오류가 발생하였습니다.");
        navigate("/login", { replace: true });
      }
    };

    processOAuthLogin();
  }, [navigate, setToken, fetchMe]);

  return null;
};

export default OAuthCallback;
