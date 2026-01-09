import type { Category } from "./category";

export type PlaceResponse = {
  id: number;
  name: string;
  category: Category;
  address: string;
  rating: number;
};
