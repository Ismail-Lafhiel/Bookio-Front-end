export interface Author {
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  nationality: string;
  email: string;
  website?: string;
  genres: string[];
  booksCount: number;
  imageUrl?: string;
}

export const authors: Author[] = [
  {
    id: "1",
    name: "F. Scott Fitzgerald",
    biography:
      "Francis Scott Fitzgerald was an American novelist, essayist, and short story writer. He was best known for his novels depicting the flamboyance and excess of the Jazz Age.",
    birthDate: "1896-09-24",
    nationality: "American",
    email: "fscott.fitzgerald@example.com",
    genres: ["Fiction", "Romance", "Social Commentary"],
    booksCount: 4,
    website: "www.fscottfitzgerald.org",
    imageUrl: "/authors/fitzgerald.jpg",
  },
  {
    id: "2",
    name: "Harper Lee",
    biography:
      "Nelle Harper Lee was an American novelist known for her 1960 novel To Kill a Mockingbird, which won the Pulitzer Prize.",
    birthDate: "1926-04-28",
    nationality: "American",
    email: "harper.lee@example.com",
    genres: ["Fiction", "Southern Gothic", "Legal Drama"],
    booksCount: 2,
  },
  {
    id: "3",
    name: "George Orwell",
    biography:
      "Eric Arthur Blair, known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic.",
    birthDate: "1903-06-25",
    nationality: "British",
    email: "george.orwell@example.com",
    genres: ["Fiction", "Dystopian", "Political Fiction", "Social Commentary"],
    booksCount: 6,
    website: "www.georgeorwell.org",
  },
  {
    id: "4",
    name: "J.R.R. Tolkien",
    biography:
      "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic. Creator of high fantasy literature.",
    birthDate: "1892-01-03",
    nationality: "British",
    email: "jrr.tolkien@example.com",
    genres: ["Fantasy", "Fiction", "Poetry"],
    booksCount: 12,
    website: "www.tolkiensociety.org",
    imageUrl: "/authors/tolkien.jpg",
  },
  {
    id: "5",
    name: "Robert C. Martin",
    biography:
      "Robert Cecil Martin, known as Uncle Bob, is an American software engineer, instructor, and best-selling author.",
    birthDate: "1952-01-01",
    nationality: "American",
    email: "robert.martin@example.com",
    genres: ["Technology", "Software Engineering", "Programming"],
    booksCount: 7,
    website: "www.cleancoders.com",
    imageUrl: "/authors/uncle-bob.jpg",
  },
  {
    id: "6",
    name: "Virginia Woolf",
    biography:
      "Adeline Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors.",
    birthDate: "1882-01-25",
    nationality: "British",
    email: "virginia.woolf@example.com",
    genres: ["Fiction", "Modernist Literature", "Essays"],
    booksCount: 9,
    website: "www.virginiawoolf.org",
  },
  {
    id: "7",
    name: "Ernest Hemingway",
    biography:
      "Ernest Miller Hemingway was an American novelist, short-story writer, and journalist.",
    birthDate: "1899-07-21",
    nationality: "American",
    email: "ernest.hemingway@example.com",
    genres: ["Fiction", "Literary Fiction", "War Stories"],
    booksCount: 7,
    imageUrl: "/authors/hemingway.jpg",
  },
  {
    id: "8",
    name: "Jane Austen",
    biography:
      "Jane Austen was an English novelist known primarily for her six major novels.",
    birthDate: "1775-12-16",
    nationality: "British",
    email: "jane.austen@example.com",
    genres: ["Romance", "Literary Fiction", "Social Commentary"],
    booksCount: 6,
    website: "www.janeausten.org",
  },
];

// Utility functions for filtering and pagination
export const filterAuthors = (
  authors: Author[],
  searchTerm: string
): Author[] => {
  const query = searchTerm.toLowerCase().trim();
  return authors.filter(
    (author) =>
      author.name.toLowerCase().includes(query) ||
      author.nationality.toLowerCase().includes(query) ||
      author.genres.some((genre) => genre.toLowerCase().includes(query))
  );
};

export const paginateAuthors = (
  authors: Author[],
  currentPage: number,
  pageSize: number
): Author[] => {
  const startIndex = (currentPage - 1) * pageSize;
  return authors.slice(startIndex, startIndex + pageSize);
};
