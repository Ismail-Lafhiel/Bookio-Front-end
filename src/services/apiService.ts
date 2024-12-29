import {
  Book,
  BookApiResponse,
  BookFormData,
  BorrowBook,
} from "../interfaces/book";
import { Category, CategoryApiResponse } from "../interfaces/Category";
import api from "./api";

// Books API
export const booksApi = {
  getAll: () => api.get<BookApiResponse>("/books"),
  getOne: (id: string) => api.get<Book>(`/books/${id}`),
  create: (data: BookFormData) => api.post<Book>("/books", data),
  update: (id: string, data: Partial<BookFormData>) =>
    api.patch<Book>(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
  findByAuthor: (authorId: string) =>
    api.get<Book[]>(`/books/author/${authorId}`),
  findByCategory: (categoryId: string) =>
    api.get<Book[]>(`/books/category/${categoryId}`),
  findByRating: (rating: number) => api.get<Book[]>(`/books/rating/${rating}`),
  search: (query: string) =>
    api.get<Book[]>(`/books/search`, { params: { query } }),
  borrow: (id: string, data: BorrowBook) =>
    api.post<Book>(`/books/${id}/borrow`, data),
  return: (id: string) => api.post<Book>(`/books/${id}/return`),
};

// Categories API
export const categoriesApi = {
  getAll: () => api.get<CategoryApiResponse>("/categories"),
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
