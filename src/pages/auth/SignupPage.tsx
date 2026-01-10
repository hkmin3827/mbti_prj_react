import { useEffect, useRef, useState } from "react";
import {
  PageWrapper,
  SignupCard,
  Title,
  SubTitle,
  Input,
  SignupButton,
  FooterText,
  Form,
  AuthHeader,
  LogoImg,
  LogoText,
} from "../../styles/auth/Signup.styles";
import { signupApi } from "../../api/auth.api";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/3D하트.png";

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    telnum: "",
  });
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "비밀번호는 8자 이상의 영문 소문자와 숫자를 반드시 포함해야 합니다.";
    }
    if (!/[a-z]/.test(password)) {
      return "비밀번호는 8자 이상의 영문 소문자와 숫자를 반드시 포함해야 합니다.";
    }
    if (!/[0-9]/.test(password)) {
      return "비밀번호는 8자 이상의 영문 소문자와 숫자를 반드시 포함해야 합니다.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      passwordRef.current?.setCustomValidity("");
      passwordConfirmRef.current?.setCustomValidity("");
    }

    if (name === "passwordConfirm") {
      passwordConfirmRef.current?.setCustomValidity("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      passwordRef.current?.setCustomValidity(passwordError);
      passwordRef.current?.reportValidity();
      return;
    } else {
      passwordRef.current?.setCustomValidity("");
    }

    // 2. 비밀번호 일치 검사
    if (form.password !== form.passwordConfirm) {
      passwordConfirmRef.current?.setCustomValidity(
        "비밀번호가 일치하지 않습니다."
      );
      passwordConfirmRef.current?.reportValidity();
      return;
    } else {
      passwordConfirmRef.current?.setCustomValidity("");
    }

    try {
      setLoading(true);

      await signupApi({
        email: form.email,
        password: form.password,
        name: form.name,
        telnum: form.telnum,
      });

      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      alert(err.response?.data?.message ?? "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <PageWrapper>
      <AuthHeader onClick={() => navigate("/login")}>
        <LogoImg src={logo} alt="What's Lover 로고" />
        <LogoText>What's your Lover's MBTI?</LogoText>
      </AuthHeader>

      <SignupCard>
        <Title>Sign Up</Title>
        <SubTitle>새로운 경험을 시작해보세요</SubTitle>

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
            name="name"
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Input
            ref={passwordConfirmRef}
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
            required
          />

          <SignupButton type="submit" disabled={loading}>
            {loading ? "처리 중..." : "가입하기"}
          </SignupButton>
        </Form>

        <FooterText>
          이미 계정이 있나요? <span onClick={goToLogin}>로그인</span>
        </FooterText>
      </SignupCard>
    </PageWrapper>
  );
};

export default SignupPage;
