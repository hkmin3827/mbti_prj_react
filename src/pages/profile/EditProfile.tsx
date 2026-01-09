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
} from "../../styles/profile/EditProfile.styles.tsx";
import { UserContext } from "../../context/UserContext.tsx";
import { useState } from "react";
import { updateBasicProfileApi } from "../../api/profile.api.ts";
import { getPresignedUrlApi } from "../../api/s3.api.ts";
import { handleApiError } from "../../utils/handleApiError.ts";
import { useNavigate } from "react-router-dom";
import { EditButton } from "../../styles/review/ReviewDetailDrawer.styles.tsx";

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

  // validation
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    const newLocal = /^[가-힣a-zA-Z0-9]+$/;
    if (!name.trim()) {
      newErrors.name = "이름은 필수 입력입니다.";
    } else if (!newLocal.test(name)) {
      newErrors.name = "이름은 한글, 영문 대소문자, 숫자만 입력할 수 있습니다.";
    }

    if (!telnum.trim()) {
      newErrors.telnum = "전화번호는 필수 입력입니다.";
    } else if (!/^010\d{8}$/.test(telnum)) {
      newErrors.telnum = "전화번호는 010으로 시작하는 11자리여야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    // validation
    if (!validate()) return;

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

      // 3️백엔드에 프로필 저장
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

  return (
    <PageContainer>
      <Panel key={user?.id}>
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
                      <p>{user?.partnerMbti}</p>
                    </Mbti>
                  </MbtiWrapper>
                </MbtiInfo>
              </MbtiInfo>
            </InfoWrapper>
          </PanelContent>
        </ContextWrapper>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
      </Panel>
    </PageContainer>
  );
}
