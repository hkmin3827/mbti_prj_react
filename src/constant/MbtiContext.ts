export const MBTI_CONTEXT = {
  SELF: "SELF",
  PARTNER: "PARTNER",
} as const;

export type MbtiContext = (typeof MBTI_CONTEXT)[keyof typeof MBTI_CONTEXT];
