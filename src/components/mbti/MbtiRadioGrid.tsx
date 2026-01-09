import { MBTI_LIST } from "../../constant/MbtiType";
import type { MbtiType } from "../../constant/MbtiType";
import {
  Wrapper,
  Title,
  Required,
  Label,
  Grid,
} from "../../styles/profile/MbtiRadioGrid.styles";

interface Props {
  title: string;
  value: MbtiType | null;
  onChange: (v: MbtiType) => void;
  required?: boolean;
}

export default function MbtiRadioGrid({
  title,
  value,
  onChange,
  required = false,
}: Props) {
  return (
    <Wrapper>
      <Title>
        {title}
        {required && <Required>*</Required>}
      </Title>

      <Grid>
        {MBTI_LIST.map((mbti) => (
          <Label key={mbti} $checked={value === mbti}>
            <input
              type="radio"
              name={title}
              value={mbti}
              checked={value === mbti}
              onChange={() => onChange(mbti)}
            />
            {mbti}
          </Label>
        ))}
      </Grid>
    </Wrapper>
  );
}
