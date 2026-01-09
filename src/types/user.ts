export interface User {
  id: number;
  email: string | null;
  name: string;
  provider: string;
  oauthId: string;
  mbti: string;
  partnerMbti: string | null;
  telnum: string | null;
  profileImage: string;
  profileCompleted: boolean;
  isActive: boolean;
  createdAt: string;
}
