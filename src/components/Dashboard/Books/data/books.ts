export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: "Available" | "Borrowed" | "Reserved";
  description: string;
  publishedDate: string;
  quantity: number;
  borrower?: string;
  dueDate?: string;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    status: "Available",
    description: "A story of decadence and excess.",
    publishedDate: "1925-04-10",
    quantity: 5,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    category: "Fiction",
    status: "Borrowed",
    description: "A story of racial injustice and loss of innocence.",
    publishedDate: "1960-07-11",
    quantity: 3,
    borrower: "John Doe",
    dueDate: "2024-02-15",
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Fiction",
    status: "Reserved",
    description: "A dystopian social science fiction novel.",
    publishedDate: "1949-06-08",
    quantity: 4,
  },
  {
    id: "4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    category: "Fiction",
    status: "Available",
    description: "A fantasy novel about Bilbo Baggins.",
    publishedDate: "1937-09-21",
    quantity: 6,
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    status: "Available",
    description: "A handbook of agile software craftsmanship.",
    publishedDate: "2008-08-11",
    quantity: 3,
  },
  {
    id: "6",
    title: "911",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    status: "Available",
    description: "A handbook of agile software craftsmanship.",
    publishedDate: "2008-08-11",
    quantity: 3,
  },
  {
    id: "7",
    title: "Js Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    status: "Available",
    description: "A handbook of agile software craftsmanship.",
    publishedDate: "2008-08-11",
    quantity: 3,
  },
  {
    id: "8",
    title: "Boite de merveille",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    status: "Available",
    description: "A handbook of agile software craftsmanship.",
    publishedDate: "2008-08-11",
    quantity: 3,
  },
  //
  {
    id: "9",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    status: "Available",
    description: "A story of decadence and excess.",
    publishedDate: "1925-04-10",
    quantity: 5,
  },
  {
    id: "10",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    category: "Fiction",
    status: "Borrowed",
    description: "A story of racial injustice and loss of innocence.",
    publishedDate: "1960-07-11",
    quantity: 3,
    borrower: "John Doe",
    dueDate: "2024-02-15",
  },
  {
    id: "11",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Fiction",
    status: "Reserved",
    description: "A dystopian social science fiction novel.",
    publishedDate: "1949-06-08",
    quantity: 4,
  },
  {
    id: "12",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    category: "Fiction",
    status: "Available",
    description: "A fantasy novel about Bilbo Baggins.",
    publishedDate: "1937-09-21",
    quantity: 6,
  },
  {
    id: "13",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    status: "Available",
    description: "A handbook of agile software craftsmanship.",
    publishedDate: "2008-08-11",
    quantity: 3,
  },
];

// Utility functions for filtering and pagination
export const filterBooks = (books: Book[], searchTerm: string): Book[] => {
  const query = searchTerm.toLowerCase().trim();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query)
  );
};

export const paginateBooks = (
  books: Book[],
  currentPage: number,
  pageSize: number
): Book[] => {
  const startIndex = (currentPage - 1) * pageSize;
  return books.slice(startIndex, startIndex + pageSize);
};
