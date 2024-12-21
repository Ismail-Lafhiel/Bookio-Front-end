// DashboardCategories.tsx
import { useState, useEffect, useMemo } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import {
  categories,
  filterCategories,
  paginateCategories,
} from "./data/categories";
import type { Category } from "./data/categories";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
} from "react-icons/hi";
import CreateCategoryModal from "./Modals/CreateCategoryModal";
import UpdateCategoryModal from "./Modals/UpdateCategoryModal";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";
import Pagination from "../../UI/Pagination";

const DashboardCategories = () => {
  // States for data management
  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Pagination settings
  const pageSize = 5;

  // Load initial data
  useEffect(() => {
    setLocalCategories(categories);
  }, []);

  // Filter and paginate data
  const filteredCategories = useMemo(() => {
    return filterCategories(localCategories, searchQuery);
  }, [localCategories, searchQuery]);

  const paginatedCategories = useMemo(() => {
    return paginateCategories(filteredCategories, currentPage, pageSize);
  }, [filteredCategories, currentPage]);

  const totalPages = Math.ceil(filteredCategories.length / pageSize);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateCategory = (
    categoryData: Omit<Category, "id" | "createdAt" | "booksCount">
  ) => {
    // Implementation for creating category
    console.log("Creating category:", categoryData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateCategory = (
    categoryData: Omit<Category, "id" | "createdAt" | "booksCount">
  ) => {
    // Implementation for updating category
    console.log("Updating category:", categoryData);
    setIsUpdateModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    // Implementation for deleting category
    console.log("Deleting category:", categoryToDelete);
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const itemsPerPage = 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Categories
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all the categories in your library
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary/90 to-primary border border-transparent rounded-md shadow-sm hover:from-primary hover:to-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-all duration-200"
        >
          <HiOutlinePlus className="-ml-1 mr-2 h-5 w-5" />
          Add Category
        </button>
      </div>
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
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
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Books Count
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {category.booksCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                {/*  */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsUpdateModalOpen(true);
                      }}
                      className="text-primary dark:text-primary hover:text-primary dark:hover:text-primary"
                    >
                      <HiOutlinePencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(category);
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

        {filteredCategories.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              No categories found.{" "}
              {searchQuery
                ? "Try a different search term."
                : "Start by adding a new category."}
            </p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {filteredCategories.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCategories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
      {/* Modals */}
      <div className="relative z-50">
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCategory}
        />
        <UpdateCategoryModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleUpdateCategory}
          categoryData={selectedCategory}
        />
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
          }}
          onConfirm={handleDeleteCategory}
          categoryName={categoryToDelete?.name || ""}
        />
      </div>
    </div>
  );
};

export default DashboardCategories;
