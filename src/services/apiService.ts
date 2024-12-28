import { Category } from "../interfaces/Category";
import api from "./api";

// Types
export interface Book {
  id: string;
  title: string;
  // ... other book properties
}

// Books API
export const booksApi = {
  getAll: () => api.get<Book[]>("/books"),
  getOne: (id: string) => api.get<Book>(`/books/${id}`),
  create: (data: Partial<Book>) => api.post<Book>("/books", data),
  update: (id: string, data: Partial<Book>) =>
    api.patch<Book>(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
  borrow: (id: string, borrowData: any) =>
    api.patch(`/books/${id}/borrow`, borrowData),
};

// Categories API
export const categoriesApi = {
  getAll: () => api.get<Category[]>("/categories"),
  getOne: (id: string) => api.get<Category>(`/categories/${id}`),
  create: (data: Partial<Category>) => api.post<Category>("/categories", data),
  update: (id: string, data: Partial<Category>) =>
    api.patch<Category>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
  findByAuthor: (authorId: string) =>
    api.get<Category[]>(`/categories/author/${authorId}`),
  findByBook: (bookId: string) =>
    api.get<Category[]>(`/categories/book/${bookId}`),
};
