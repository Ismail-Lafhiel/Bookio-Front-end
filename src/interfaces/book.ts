export interface Book {
  id: string;
  title: string;
  authorId: string;
  categoryId: string;
  isbn: string;
  status: BookStatus;
  description?: string;
  publishedYear: number;
  borrowerId?: string;
  quantity: number;
  cover: string;
  pdf: string;
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  returnDate?: string;
  rating: number;
}

export enum BookStatus {
  AVAILABLE = "AVAILABLE",
  BORROWED = "BORROWED",
  UNAVAILABLE = "UNAVAILABLE",
}

export interface BorrowBook {
  startDate: string;
  returnDate: string;
}

export interface BookFormData {
  title: string;
  authorId: string;
  categoryId: string;
  isbn: string;
  description?: string;
  publishedYear: number;
  quantity: number;
  cover: string;
  pdf: string;
  rating: number;
}

export interface BookApiResponse {
  message: string;
  books: Book[];
}
