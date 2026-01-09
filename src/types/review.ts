export interface Review {
  id: number;
  rating: number;
  content: string;
  reviewImageUrl?: string | null;
  verified: boolean;
  createdAt: string;

  user: {
    id: number;
    name: string;
    profileImage?: string | null;
  };

  place: {
    id: number;
    name: string;
  };
}
