export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  booksCount: number;
  updatedAt?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}

export interface CategoryApiResponse {
  message: string;
  categories: Category[];
}
