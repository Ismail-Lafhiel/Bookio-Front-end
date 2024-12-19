// CreateBookModal.tsx
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { FormInput } from "../../../UI/FormInput";
import { FormSelect } from "../../../UI/FormSelect";
import {
  BookOpenIcon,
  UserIcon,
  IdentificationIcon,
  TagIcon,
  DocumentTextIcon,
  CalendarIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  publishedDate: string;
  quantity: number;
}

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: BookFormData) => void;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const CreateBookModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateBookModalProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    description: "",
    publishedDate: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
                      Create New Book
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <FormInput
                          label="Title"
                          placeholder="Enter book title"
                          id="title"
                          name="title"
                          type="text"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          error={errors.title}
                          icon={BookOpenIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Author"
                          placeholder="Enter author name"
                          id="author"
                          name="author"
                          type="text"
                          required
                          value={formData.author}
                          onChange={handleChange}
                          error={errors.author}
                          icon={UserIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="ISBN"
                          placeholder="Enter ISBN"
                          id="isbn"
                          name="isbn"
                          type="text"
                          required
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
                          required
                          value={formData.category}
                          onChange={handleChange}
                          error={errors.category}
                          icon={TagIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                          options={[
                            { value: "Fiction", label: "Fiction" },
                            { value: "Non-Fiction", label: "Non-Fiction" },
                            { value: "Science", label: "Science" },
                            { value: "Technology", label: "Technology" },
                          ]}
                        />

                        <div className="sm:col-span-2">
                          <FormInput
                            label="Description"
                            placeholder="Enter book description"
                            id="description"
                            name="description"
                            required
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
                          label="Published Date"
                          id="publishedDate"
                          name="publishedDate"
                          type="date"
                          required
                          value={formData.publishedDate}
                          onChange={handleChange}
                          error={errors.publishedDate}
                          icon={CalendarIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Quantity"
                          placeholder="Enter quantity"
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                          required
                          value={formData.quantity.toString()}
                          onChange={handleChange}
                          error={errors.quantity}
                          icon={CalculatorIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Create Book
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

export default CreateBookModal;
