export interface Author {
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  genres: string[];
  profile: string;
  booksCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorApiResponse {
  message: string;
  authors: Author[];
}
