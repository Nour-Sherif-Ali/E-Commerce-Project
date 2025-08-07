// models/subcategory.model.ts
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategoryResponse {
  data: SubCategory[];
  results?: number;
  status?: string;
}