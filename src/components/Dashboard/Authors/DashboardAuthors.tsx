import { useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  Author,
  authors,
  filterAuthors,
  paginateAuthors,
} from "./data/authors";
import Pagination from "../../UI/Pagination";
import { formatDate } from "../../../utils/formatDate";
import DeleteAuthorModal from "./Modals/DeleteAuthorModal";
import UpdateAuthorModal from "./Modals/UpdateAuthorModal";
import CreateAuthorModal from "./Modals/CreateAuthorModal";

const DashboardAuthors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 6;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  // Modal handlers
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenUpdateModal = (author: Author) => {
    setSelectedAuthor(author);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteModal = (author: Author) => {
    setSelectedAuthor(author);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedAuthor(null);
  };

  // CRUD operations
  const handleCreateAuthor = async (
    authorData: Omit<Author, "id" | "booksCount" | "imageUrl">
  ): Promise<void> => {
    try {
      // Implement create functionality
      console.log("Creating author:", authorData);
      handleCloseModals();
      // Refresh the authors list or update the state
    } catch (error) {
      console.error("Error creating author:", error);
      throw error;
    }
  };

  const handleUpdateAuthor = async (
    authorId: string,
    authorData: Omit<Author, "id" | "booksCount" | "imageUrl">
  ): Promise<void> => {
    try {
      // Implement update functionality
      console.log("Updating author:", authorId, authorData);
      handleCloseModals();
      // Refresh the authors list or update the state
    } catch (error) {
      console.error("Error updating author:", error);
      throw error;
    }
  };

  const handleDeleteAuthor = async (authorId: string) => {
    try {
      // Implement delete functionality
      console.log("Deleting author:", authorId);
      handleCloseModals();
      // Refresh the authors list or update the state
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const filteredAuthors = filterAuthors(authors, searchTerm);
  const paginatedAuthors = paginateAuthors(
    filteredAuthors,
    currentPage,
    pageSize
  );
  const totalPages = Math.ceil(filteredAuthors.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Authors
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your book authors and their information
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary/90 to-primary border border-transparent rounded-md shadow-sm hover:from-primary hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-all duration-200"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Author
        </button>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-primary dark:focus:ring-primary-dark focus:border-primary dark:focus:border-primary-dark sm:text-sm transition-colors duration-200"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedAuthors.map((author) => (
          <div
            key={author.id}
            className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="relative p-6 flex flex-col h-full">
              {/* Author Header with integrated actions */}
              <div className="flex items-center space-x-4 mb-6">
                {author.imageUrl ? (
                  <img
                    src={author.imageUrl}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-light/30 to-primary/30 dark:from-primary-dark/30 dark:to-primary/30 flex items-center justify-center ring-2 ring-primary/20">
                    <span className="text-2xl font-medium text-primary dark:text-primary-light">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light truncate transition-colors duration-200">
                      {author.name}
                    </p>
                    {/* Author Actions */}
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                      <button
                        onClick={() => handleOpenUpdateModal(author)}
                        className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        title="Edit author"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(author)}
                        className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        title="Delete author"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {author.nationality}
                  </p>
                </div>
              </div>

              {/* Author Content */}
              <div className="flex-1 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[40px]">
                  {author.biography}
                </p>

                {/* Genres with dynamic height */}
                <div className="min-h-[40px]">
                  <div className="flex flex-wrap gap-2">
                    {author.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-light/10 to-primary/10 dark:from-primary-dark/10 dark:to-primary/10 text-primary-dark dark:text-primary-light"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 flex items-center justify-between text-sm border-t border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <span className="font-medium text-primary/80 dark:text-primary-light/80">
                    Born:
                  </span>
                  <span>{formatDate(author.birthDate)}</span>
                </div>
                <div className="text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <span className="font-medium text-primary/80 dark:text-primary-light/80">
                    Books:
                  </span>
                  <span>{author.booksCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateAuthorModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleCreateAuthor}
      />

      {selectedAuthor && (
        <>
          <UpdateAuthorModal
            isOpen={isUpdateModalOpen}
            onClose={handleCloseModals}
            onSubmit={(data) => handleUpdateAuthor(selectedAuthor.id, data)}
            author={selectedAuthor}
          />

          <DeleteAuthorModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseModals}
            onConfirm={() => handleDeleteAuthor(selectedAuthor.id)}
            author={selectedAuthor}
          />
        </>
      )}

      {/* Pagination */}
      {filteredAuthors.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAuthors.length}
          itemsPerPage={pageSize}
          onPageChange={handlePageChange}
        />
      )}

      {/* No Results */}
      {paginatedAuthors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No authors found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardAuthors;
