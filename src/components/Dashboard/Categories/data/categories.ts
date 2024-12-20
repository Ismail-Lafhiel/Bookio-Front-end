export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    booksCount: number;
  }
  
  export const categories: Category[] = [
    {
      id: "1",
      name: "Fiction",
      description: "Narrative works created from the imagination",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 25,
    },
    {
      id: "2",
      name: "Non-Fiction",
      description: "Works based on facts and real events",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 30,
    },
    {
      id: "3",
      name: "Science",
      description: "Works related to scientific topics and research",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 15,
    },
    {
      id: "4",
      name: "Technology",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "5",
      name: "x",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "6",
      name: "y",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "7",
      name: "z",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "8",
      name: "T",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "9",
      name: "E",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "10",
      name: "SS",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    {
      id: "11",
      name: "DDF",
      description: "Books about computers, programming, and tech",
      createdAt: "2024-01-15T10:00:00Z",
      booksCount: 20,
    },
    
  ];
  
  // Utility functions for filtering and pagination
  export const filterCategories = (
    categories: Category[],
    searchQuery: string
  ): Category[] => {
    const query = searchQuery.toLowerCase().trim();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  };
  
  export const paginateCategories = (
    categories: Category[],
    currentPage: number,
    pageSize: number
  ): Category[] => {
    const startIndex = (currentPage - 1) * pageSize;
    return categories.slice(startIndex, startIndex + pageSize);
  };
  