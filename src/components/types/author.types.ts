export interface Author {
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  website?: string;
  genres: string[];
  imageUrl?: string;
  booksCount: number;
}

export interface CreateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<Author, "id" | "booksCount" | "imageUrl">
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
    data: Omit<Author, "id" | "booksCount" | "imageUrl">
  ) => Promise<void>;
}

export interface AuthorFormData {
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  website: string;
  genres: string[];
}
