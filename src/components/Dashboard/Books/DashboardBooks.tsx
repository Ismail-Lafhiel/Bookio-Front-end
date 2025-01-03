// DashboardBooks.tsx
import { useState, useEffect, useMemo } from "react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { toast } from "react-hot-toast";
import CreateBookModal from "./Modals/CreateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";
import UpdateBookModal from "./Modals/UpdateBookModal";
import Pagination from "../../UI/Pagination";
import {
  booksApi,
  categoriesApi,
  authorsApi,
} from "../../../services/apiService";
import { Book } from "../../../interfaces/book";
import { Category } from "../../../interfaces/Category";
import { Author } from "../../../interfaces/author";

const DashboardBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: Category }>({});
  const [authors, setAuthors] = useState<{ [key: string]: Author }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Pagination settings
  const pageSize = 5;

  // Load initial data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksApi.getAll();
        const data = response.data.books;
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        const categoriesMap = response.data.categories.reduce(
          (acc, category) => {
            acc[category.id] = category;
            return acc;
          },
          {} as { [key: string]: Category }
        );
        setCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorsApi.getAll();
        const authorsMap = response.data.authors.reduce((acc, author) => {
          acc[author.id] = author;
          return acc;
        }, {} as { [key: string]: Author });
        setAuthors(authorsMap);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  // Filter and paginate data
  const filteredBooks = useMemo(() => {
    const filtered = books.filter((books) =>
      books.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered categories:", filtered);
    return filtered;
  }, [books, searchQuery]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filteredBooks.slice(startIndex, startIndex + pageSize);
    console.log("Paginated categories:", paginated);
    return paginated;
  }, [filteredBooks, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / pageSize);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: Book["status"]) => {
    switch (status) {
      case "AVAILABLE":
        return "lowercase bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500";
      case "BORROWED":
        return "lowercase bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500";
      case "UNAVAILABLE":
        return "lowercase bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500";
      default:
        return "lowercase bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-500";
    }
  };

  const handleCreateBook = (bookData: Book) => {
    setBooks((prevBooks) => [bookData, ...prevBooks]);
    setIsCreateModalOpen(false);
    toast.success("Book created successfully!");
  };

  const handleUpdateBook = async (bookData: Book) => {
    if (!selectedBook) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", bookData.title);
    formDataToSend.append("authorId", bookData.authorId);
    formDataToSend.append("categoryId", bookData.categoryId);
    formDataToSend.append("isbn", bookData.isbn);
    formDataToSend.append("description", bookData.description || "");
    formDataToSend.append("publishedYear", bookData.publishedYear.toString());
    formDataToSend.append("quantity", bookData.quantity.toString());
    formDataToSend.append("rating", (bookData.rating ?? 0).toString()); // Ensure rating is a number
    if (bookData.cover) formDataToSend.append("cover", bookData.cover);
    if (bookData.pdf) formDataToSend.append("pdf", bookData.pdf);

    try {
      // @ts-ignore
      const response = await booksApi.update(selectedBook.id, formDataToSend);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? response.data : book
        )
      );
      setIsUpdateModalOpen(false);
      setSelectedBook(null);
      toast.success("Book updated successfully!");
    } catch (error: any) {
      console.error("Failed to update book:", error);
      if (error.response?.data?.message) {
        console.error("Server error message:", error.response.data.message);
      }
    }
  };

  const handleDeleteBook = (deletedBookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== deletedBookId)
    );
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
    toast.success("Book deleted successfully!");
  };

  const itemsPerPage = 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Books
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all the books in your library
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary/90 to-primary border border-transparent rounded-md shadow-sm hover:from-primary hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-all duration-200"
        >
          <HiOutlinePlus className="-ml-1 mr-2 h-5 w-5" />
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex-none">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <HiOutlineFilter className="-ml-1 mr-2 h-5 w-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                ISBN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Created at
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {authors[book.authorId]?.name || book.authorId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {categories[book.categoryId]?.name || book.categoryId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.rating}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                        setIsUpdateModalOpen(true);
                      }}
                      className="text-primary dark:text-primary hover:text-primary dark:hover:text-primary"
                    >
                      <HiOutlinePencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        // @ts-ignore
                        setBookToDelete(book);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <HiOutlineTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBooks.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              No books found.{" "}
              {searchQuery
                ? "Try a different search term."
                : "Start by adding a new book."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredBooks.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modals */}
      <div className="relative z-50">
        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateBook}
        />
        <UpdateBookModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedBook(null);
          }}
          onSubmit={handleUpdateBook}
          bookData={selectedBook}
        />
        <DeleteBookModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setBookToDelete(null);
          }}
          onConfirm={handleDeleteBook}
          bookTitle={bookToDelete?.title || ""}
          bookData={{ id: bookToDelete?.id || "" }}
        />
      </div>
    </div>
  );
};

export default DashboardBooks;
