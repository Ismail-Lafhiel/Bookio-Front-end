// DashboardBooks.tsx
import { useState, useEffect, useMemo } from "react";
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import CreateBookModal from "./Modals/CreateBookModal";
import DeleteBookModal from "./Modals/DeleteBookModal";
import UpdateBookModal from "./Modals/UpdateBookModal";
import { books, filterBooks, paginateBooks } from "./data/books";
import type { Book } from "./data/books";
import type { BookFormData } from "./Modals/CreateBookModal";
import Pagination from "../../UI/Pagination";

const DashboardBooks = () => {
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookFormData | null>(null);
  const [bookToDelete, setBookToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Load initial data
  useEffect(() => {
    setLocalBooks(books);
  }, []);

  // Filter and paginate data
  const filteredBooks = useMemo(() => {
    return filterBooks(localBooks, searchTerm);
  }, [localBooks, searchTerm]);

  const currentItems = useMemo(() => {
    return paginateBooks(filteredBooks, currentPage, itemsPerPage);
  }, [filteredBooks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status: Book["status"]) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500";
      case "Borrowed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500";
      case "Reserved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-500";
    }
  };

  const handleCreateBook = (bookData: BookFormData) => {
    // Handle create book logic
    console.log("Creating book:", bookData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateBook = (bookData: BookFormData) => {
    // Handle update book logic
    console.log("Updating book:", bookData);
    setIsUpdateModalOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = () => {
    // Handle delete book logic
    console.log("Deleting book:", bookToDelete);
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const openDeleteModal = ({ id, title }: { id: string; title: string }) => {
    setBookToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = (book: Book) => {
    const bookData: BookFormData = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      description: book.description,
      publishedDate: book.publishedDate,
      quantity: book.quantity,
    };
    setSelectedBook(bookData);
    setIsUpdateModalOpen(true);
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                Status
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
            {currentItems.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {book.category}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openUpdateModal(book)}
                      className="text-primary dark:text-primary hover:text-primary dark:hover:text-primary"
                    >
                      <HiOutlinePencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        openDeleteModal({ id: book.id, title: book.title })
                      }
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
              {searchTerm
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
        />
      </div>
    </div>
  );
};

export default DashboardBooks;
