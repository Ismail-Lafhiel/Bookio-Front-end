// UpdateBookModal.tsx
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { FormInput } from "../../../UI/FormInput";
import { FormSelect } from "../../../UI/FormSelect";
import { FormNumberInput } from "../../../UI/FormNumberInput";
import {
  BookOpenIcon,
  UserIcon,
  IdentificationIcon,
  TagIcon,
  DocumentTextIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Book, BookFormData } from "../../../../interfaces/book";
import {
  booksApi,
  categoriesApi,
  authorsApi,
} from "../../../../services/apiService";
import { FormFileInput } from "../../../UI/FormFileInput";
import { Category } from "../../../../interfaces/Category";
import { Author } from "../../../types/author.types";

interface UpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: Book) => void;
  bookData: Book | null;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const UpdateBookModal = ({
  isOpen,
  onClose,
  onSubmit,
  bookData,
}: UpdateBookModalProps) => {
  const [formData, setFormData] = useState<Partial<BookFormData>>({
    title: bookData?.title || "",
    authorId: bookData?.authorId || "",
    categoryId: bookData?.categoryId || "",
    isbn: bookData?.isbn || "",
    description: bookData?.description || "",
    publishedYear: bookData?.publishedYear || new Date().getFullYear(),
    quantity: bookData?.quantity || 1,
    cover: bookData?.cover || "",
    pdf: bookData?.pdf || "",
    rating: bookData?.rating || 0,
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [authors, setAuthors] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        const categoryOptions = response.data.categories.map(
          (category: Category) => ({
            value: category.id,
            label: category.name,
          })
        );
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await authorsApi.getAll();
        const authorOptions = response.data.authors.map((author: Author) => ({
          value: author.id,
          label: author.name,
        }));
        setAuthors(authorOptions);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    if (bookData) {
      setFormData({
        title: bookData.title,
        authorId: bookData.authorId,
        categoryId: bookData.categoryId,
        isbn: bookData.isbn,
        description: bookData.description || "",
        publishedYear: bookData.publishedYear,
        quantity: bookData.quantity,
        cover: bookData.cover,
        pdf: bookData.pdf,
        rating: bookData.rating || 0,
      });
    }
  }, [bookData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "publishedYear" || name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "cover") {
        setCoverFile(files[0]);
      } else if (name === "pdf") {
        setPdfFile(files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("authorId", formData.authorId || "");
    formDataToSend.append("categoryId", formData.categoryId || "");
    formDataToSend.append("isbn", formData.isbn || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append(
      "publishedYear",
      formData.publishedYear?.toString() || ""
    );
    formDataToSend.append("quantity", formData.quantity?.toString() || "0");
    formDataToSend.append("rating", (formData.rating ?? 0).toString());
    if (coverFile) formDataToSend.append("cover", coverFile);
    if (pdfFile) formDataToSend.append("pdf", pdfFile);

    try {
      // @ts-ignore
      const response = await booksApi.update(bookData.id, formDataToSend);
      onSubmit(response.data as Book);
      onClose();
    } catch (error: any) {
      console.error("Failed to update book:", error);
      if (error.response?.data?.message) {
        const serverErrors = error.response.data.message;
        const newErrors: FormErrors = {};
        serverErrors.forEach((error: string) => {
          const [field] = error.split(" ");
          newErrors[field.toLowerCase()] = error;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <HiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      Update Book
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <FormInput
                          label="Title"
                          placeholder="Enter book title"
                          id="title"
                          name="title"
                          type="text"
                          value={formData.title}
                          onChange={handleChange}
                          error={errors.title}
                          icon={BookOpenIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormSelect
                          label="Author"
                          placeholder="Select author"
                          id="author"
                          name="author"
                          // @ts-ignore
                          value={formData.authorId}
                          onChange={(e) =>
                            handleSelectChange("authorId", e.target.value)
                          }
                          error={errors.author}
                          icon={UserIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                          options={authors}
                        />

                        <FormInput
                          label="ISBN"
                          placeholder="Enter ISBN"
                          id="isbn"
                          name="isbn"
                          type="text"
                          value={formData.isbn}
                          onChange={handleChange}
                          error={errors.isbn}
                          icon={IdentificationIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormSelect
                          label="Category"
                          placeholder="Select category"
                          id="category"
                          name="category"
                          // @ts-ignore
                          value={formData.categoryId}
                          onChange={(e) =>
                            handleSelectChange("categoryId", e.target.value)
                          }
                          error={errors.category}
                          icon={TagIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                          options={categories}
                        />

                        <div className="sm:col-span-2">
                          <FormInput
                            label="Description"
                            placeholder="Enter book description"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            icon={DocumentTextIcon}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            labelClassName="dark:text-gray-200"
                            textArea
                            autoGrow
                          />
                        </div>

                        <FormInput
                          label="Published Year"
                          id="publishedYear"
                          name="publishedYear"
                          type="number"
                          value={formData.publishedYear?.toString() || ""}
                          onChange={handleChange}
                          error={errors.publishedYear}
                          icon={CalendarIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormNumberInput
                          label="Quantity"
                          placeholder="Enter quantity"
                          id="quantity"
                          name="quantity"
                          min={1}
                          value={formData.quantity || 0}
                          onChange={handleChange}
                          error={errors.quantity}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormFileInput
                          label="Cover"
                          id="cover"
                          name="cover"
                          onChange={handleFileChange}
                          error={errors.cover}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormFileInput
                          label="PDF"
                          id="pdf"
                          name="pdf"
                          onChange={handleFileChange}
                          error={errors.pdf}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormNumberInput
                          label="Rating"
                          placeholder="Enter rating"
                          id="rating"
                          name="rating"
                          min={0}
                          max={5}
                          value={formData.rating || 0}
                          onChange={handleChange}
                          error={errors.rating}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Update Book
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateBookModal;
