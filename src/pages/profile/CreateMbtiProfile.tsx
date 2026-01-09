import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MbtiRadioGrid from "../../components/mbti/MbtiRadioGrid";
import type { MbtiType } from "../../constant/MbtiType";
import { createMbtiProfileApi } from "../../api/profile.api";
import {
  Page,
  Card,
  Section,
  Divider,
  SubmitButton,
  MbtiRow,
} from "../../styles/profile/CreateMbtiProfile.styles";
import type { AxiosError } from "axios";
import { UserContext } from "../../context/UserContext";

export default function CreateMbtiProfilePage() {
  const navigate = useNavigate();

  const [mbti, setMbti] = useState<MbtiType | null>(null);
  const [partnerMbti, setPartnerMbti] = useState<MbtiType | null>(null);
  const [loading, setLoading] = useState(false);

  const { fetchMe } = useContext(UserContext);

  const handleSubmit = async () => {
    if (!mbti) {
      alert("내 MBTI는 필수입니다.");
      return;
    }

    try {
      setLoading(true);

      await createMbtiProfileApi({
        mbti,
        partnerMbti,
      });
      await fetchMe();

      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response?.status === 409) {
        alert(err.response?.data?.message);
        navigate("/");
        return;
      }
      alert(err.response?.data?.message ?? "MBTI 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <MbtiRow>
          <Section>
            <MbtiRadioGrid
              title="Your MBTI"
              value={mbti}
              onChange={setMbti}
              required
            />
          </Section>

          <Divider />

          <Section>
            <MbtiRadioGrid
              title="Lover's MBTI (선택)"
              value={partnerMbti}
              onChange={setPartnerMbti}
            />
          </Section>
        </MbtiRow>

        <SubmitButton onClick={handleSubmit} disabled={loading}>
          완료
          <span
            style={{ fontSize: "18px" }}
            className="material-symbols-outlined"
          >
            arrow_forward
          </span>
        </SubmitButton>
      </Card>
    </Page>
  );
}
