import { useContext, useEffect, type ChangeEvent } from "react";
import {
  PageContainer,
  Panel,
  PanelContent,
  PanelTitle,
  ProfileInput,
  ImagePreview,
  ImageUpload,
  ErrorText,
  SubmitButton,
  ContextWrapper,
  HiddenFileInput,
  UploadButton,
  Label,
  InfoWrapper,
  BasicInfo,
  MbtiInfo,
  MbtiTitle,
  Mbti,
  MbtiWrapper,
  LogoutButton,
  WithdrawButton,
} from "../../styles/profile/EditProfile.styles.tsx";
import { UserContext } from "../../context/UserContext.tsx";
import { useState } from "react";
import { updateBasicProfileApi } from "../../api/profile.api.ts";
import { getPresignedUrlApi } from "../../api/s3.api.ts";
import { handleApiError } from "../../utils/handleApiError.ts";
import { useNavigate } from "react-router-dom";
import { EditButton } from "../../styles/review/ReviewDetailDrawer.styles.tsx";
import { logoutApi, withdrawApi } from "../../api/auth.api.ts";
import { useAuthStore } from "../../store/authStore.tsx";

interface ValidationErrors {
  name?: string;
  telnum?: string;
}

export default function EditProfile() {
  const { user, fetchMe } = useContext(UserContext);

  const [name, setName] = useState<string>(user?.name ?? "");
  const [telnum, setTelnum] = useState<string>(user?.telnum ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user?.profileImage ?? null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<ValidationErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
    setTelnum(user.telnum ?? "");
    setPreviewUrl(user.profileImage ?? null);
  }, [user]);

  // 파일 선택 시
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);

    // 로컬 미리보기 URL 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    const newLocal = /^[가-힣a-zA-Z0-9]+$/;
    if (!name.trim()) {
      newErrors.name = "🚨이름은 필수 입력입니다.";
    } else if (!newLocal.test(name)) {
      newErrors.name =
        "🚨이름은 한글, 영문 대소문자, 숫자만 입력할 수 있습니다.";
    }

    if (!telnum.trim()) {
      newErrors.telnum = "🚨전화번호는 필수 입력입니다.";
    } else if (!/^010\d{8}$/.test(telnum)) {
      newErrors.telnum = "🚨전화번호는 010으로 시작하는 11자리여야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) {
      alert("이름 또는 전화번호 입력이 올바르지 않습니다. 다시 시도해주세요.");
      return;
    }
    try {
      let profileImageUrl: string | null = user?.profileImage ?? null;

      // 새 이미지 선택한 경우만 S3 업로드
      if (profileImageFile) {
        // presigned URL 요청
        const { uploadUrl, fileUrl } = await getPresignedUrlApi({
          folder: "profile",
          originalFileName: profileImageFile.name,
          contentType: profileImageFile.type,
        });

        await fetch(uploadUrl, {
          method: "PUT",
          body: profileImageFile,
          headers: {
            "Content-Type": profileImageFile.type,
          },
        });

        profileImageUrl = fileUrl;
      }

      await updateBasicProfileApi({
        name,
        telnum,
        profileImage: profileImageUrl,
      });

      await fetchMe();
      alert("프로필이 저장되었습니다.");
    } catch (error) {
      handleApiError(error, {
        400: (msg) =>
          setErrors((prev) => ({
            ...prev,
            telnum: msg,
          })),
        409: (msg) => alert(msg),
        default: () => alert("프로필 저장 중 오류가 발생했습니다."),
      });
    }
  };

  const handleLogout = async (silent: boolean = false): Promise<void> => {
    const { clearAuth } = useAuthStore.getState();

    try {
      await logoutApi();
    } catch (e) {
      console.warn("서버 로그아웃 실패", e);
    } finally {
      clearAuth();
      localStorage.removeItem("accessToken");

      if (!silent) {
        alert("로그아웃되었습니다.");
      }

      navigate("/login", { replace: true });
    }
  };

  const WITHDRAW_CONFIRM_TEXT = "탈퇴합니다";

  const handleWithdraw = async () => {
    const confirmed = window.confirm(
      "계정을 탈퇴하면 모든 데이터가 삭제됩니다. 계속하시겠습니까?"
    );
    if (!confirmed) return;

    const input = window.prompt(
      `계정을 탈퇴하려면 아래 문구를 정확히 입력하세요.\n\n"${WITHDRAW_CONFIRM_TEXT}"`
    );

    if (input === null) return; // 취소
    if (input !== WITHDRAW_CONFIRM_TEXT) {
      alert("탈퇴 확인 문구가 일치하지 않습니다.");
      return;
    }

    try {
      await withdrawApi({ confirmText: input });
      alert("탈퇴가 완료되었습니다.");
      handleLogout(true); // 토큰 제거 + 라우팅
    } catch (error) {
      handleApiError(error, {
        400: (msg) => alert(msg),
        default: () => alert("탈퇴 처리 중 오류가 발생했습니다."),
      });
    }
  };
  const onClickLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleLogout(false);
  };
  return (
    <PageContainer>
      <Panel key={user?.id}>
        <LogoutButton onClick={onClickLogout}>
          <span className="material-symbols-outlined">logout</span>
          <p>로그아웃</p>
        </LogoutButton>
        <ContextWrapper>
          <PanelTitle>Profile 수정</PanelTitle>
          <PanelContent>
            <ImageUpload>
              {previewUrl ? (
                <ImagePreview src={previewUrl} alt="프로필 이미지 미리보기" />
              ) : (
                <ImagePreview
                  src={user?.profileImage}
                  alt="프로필 이미지 미리보기"
                />
              )}

              <HiddenFileInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <UploadButton htmlFor="profile-upload">
                프로필 사진 변경
              </UploadButton>
            </ImageUpload>

            <InfoWrapper>
              <BasicInfo>
                <Label>이름</Label>
                <ProfileInput
                  placeholder="이름"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  onBlur={validate}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
                <Label>전화번호</Label>
                <ProfileInput
                  placeholder="전화번호 (010xxxxxxxx)"
                  value={telnum}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTelnum(e.target.value)
                  }
                  onBlur={validate}
                />
                {errors.telnum && <ErrorText>{errors.telnum}</ErrorText>}
              </BasicInfo>
              <MbtiInfo>
                <MbtiTitle>
                  <p>mbti</p>
                  <EditButton onClick={() => navigate("/profile/mbtiedit")}>
                    수정
                  </EditButton>
                </MbtiTitle>
                <MbtiInfo>
                  <MbtiWrapper>
                    <Mbti>
                      <p style={{ fontWeight: "600", fontSize: "20px" }}>Me</p>
                      <p>{user?.mbti}</p>
                    </Mbti>
                    <Mbti>💗</Mbti>
                    <Mbti>
                      <p style={{ fontWeight: "600", fontSize: "20px" }}>
                        Lover
                      </p>
                      <p>{user?.partnerMbti ?? "X"}</p>
                    </Mbti>
                  </MbtiWrapper>
                </MbtiInfo>
              </MbtiInfo>
            </InfoWrapper>
          </PanelContent>
        </ContextWrapper>{" "}
        <WithdrawButton onClick={handleWithdraw}>계정 탈퇴</WithdrawButton>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
      </Panel>
    </PageContainer>
  );
}
