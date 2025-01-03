import { Author, AuthorApiResponse } from "../interfaces/author";
import { Book, BookApiResponse, BorrowBook } from "../interfaces/book";
import { Category, CategoryApiResponse } from "../interfaces/Category";
import api from "./api";

// Books API
export const booksApi = {
  getAll: () => api.get<BookApiResponse>("/books"),
  getOne: (id: string) => api.get<Book>(`/books/${id}`),
  create: async (formData: FormData) => {
    return api.post<Book>("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: async (id: string, formData: FormData) => {
    return api.patch<Book>(`/books/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
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
  getByTitle: (title: string) => api.get<Book>(`/books/title/${encodeURIComponent(title)}`),
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

// Authors API
export const authorsApi = {
  getAll: () => api.get<AuthorApiResponse>("/authors"),
  getOne: (id: string) => api.get<Author>(`/authors/${id}`),
  create: async (data: FormData | Partial<Author>) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return api.post<Author>("/authors", data, { headers });
  },
  update: async (id: string, data: FormData | Partial<Author>) => {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    return api.patch<Author>(`/authors/${id}`, data, { headers });
  },
  delete: (id: string) => api.delete(`/authors/${id}`),
  findByCategory: (categoryId: string) =>
    api.get<Author[]>(`/authors/category/${categoryId}`),
  findByBook: (bookId: string) => api.get<Author[]>(`/authors/book/${bookId}`),
};