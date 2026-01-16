import { useContext, useState } from "react";
import { loginApi } from "../../api/auth.api";
import {
  PageWrapper,
  SignupCard,
  Title,
  Input,
  SignupButton,
  FooterText,
  Form,
  AuthHeader,
  LogoImg,
  LogoText,
} from "../../styles/auth/Signup.styles";
import {
  Divider,
  SocialLoginButton,
  SocialLoginGroup,
} from "../../styles/auth/Login.styles";
import { useAuthStore } from "../../store/authStore";
import GoogleIcon from "../../assets/icons/googlelogo.svg";
import KakaoLogin from "../../assets/icons/kakao_login_large_narrow.png";
import NaverLogin from "../../assets/icons/NAVER_login_Dark_EN_green_center_H56.png";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/logos/3D하트.png";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { fetchMe } = useContext(UserContext);

  const accessToken = useAuthStore((state) => state.accessToken);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginApi(form);

      setToken(res.token);

      const me = await fetchMe();

      if (!me.isActive) {
        useAuthStore.getState().clearAuth();
        alert("비활성화된 계정입니다. 관리자에게 문의하세요.");
        return;
      }
      setUser({
        id: me.id,
        email: me.email,
        role: me.role, // ADMIN / USER
      });

      if (!me.profileCompleted) {
        navigate("/profile/create");
      } else {
        navigate("/");
      }
      console.log("AccessToken", accessToken);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      alert(err.response?.data?.message ?? "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/naver`;
  };

  return (
    <PageWrapper>
      <AuthHeader onClick={() => navigate("/login")}>
        <LogoImg src={logo} alt="What's Lover 로고" />
        <LogoText>What's your Lover's MBTI?</LogoText>
      </AuthHeader>
      <SignupCard>
        <Title>Sign In</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <SignupButton type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </SignupButton>
        </Form>

        <FooterText>
          아직 계정이 없나요? <span onClick={goToSignup}>회원가입</span>
        </FooterText>

        <Divider>또는</Divider>

        <SocialLoginGroup>
          <SocialLoginButton provider="google" onClick={handleGoogleLogin}>
            <img id="google-icon" src={GoogleIcon} alt="Google logo" />
            Sign in with Google
          </SocialLoginButton>

          <SocialLoginButton provider="kakao" onClick={handleKakaoLogin}>
            <img id="kakao" src={KakaoLogin} alt="Kakao login" />
          </SocialLoginButton>

          <SocialLoginButton provider="naver" onClick={handleNaverLogin}>
            <img id="naver" src={NaverLogin} alt="Naver login" />
          </SocialLoginButton>
        </SocialLoginGroup>
      </SignupCard>
    </PageWrapper>
  );
};

export default LoginPage;
