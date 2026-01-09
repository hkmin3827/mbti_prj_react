import {
  FloatingContextWrapper,
  ContextButton,
} from "../../styles/recommend/ContextSelector.styles";
import type { MbtiContext } from "../../constant/MbtiContext";

interface Props {
  value: MbtiContext;
  onChange: (v: MbtiContext) => void;
}

export function ContextSelector({ value, onChange }: Props) {
  return (
    <FloatingContextWrapper>
      <ContextButton
        $active={value === "SELF"}
        onClick={() => onChange("SELF")}
      >
        me
      </ContextButton>
      <ContextButton
        $active={value === "PARTNER"}
        onClick={() => onChange("PARTNER")}
      >
        lover
      </ContextButton>
    </FloatingContextWrapper>
  );
}
