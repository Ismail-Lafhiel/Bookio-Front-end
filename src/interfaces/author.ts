export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  website?: string;
}

export interface Author {
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  socialMedia?: SocialMedia;
  genres: string[];
  booksCount: number;
  profile?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorApiResponse {
  message: string;
  authors: Author[];
}

export interface AuthorFormData {
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  genres: string[];
  socialMedia: SocialMedia;
}

export interface CreateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<
      Author,
      "id" | "booksCount" | "profile" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;
}

export interface DeleteAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  author: Author;
}

export interface UpdateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: Author;
  onSubmit: (
    data: Omit<
      Author,
      "id" | "booksCount" | "profile" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;
}
