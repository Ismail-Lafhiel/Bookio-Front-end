// src/components/Dashboard/Authors/Modals/UpdateAuthorModal.tsx
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FormInput } from "../../../UI/FormInput";
import {
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  TagIcon,
  FlagIcon,
  XMarkIcon as HiX,
} from "@heroicons/react/24/outline";
import { AuthorFormData, UpdateAuthorModalProps } from "../../../types/author.types";
import { authorsApi } from "../../../../services/apiService";

const UpdateAuthorModal = ({
  isOpen,
  onClose,
  onSubmit,
  author,
}: UpdateAuthorModalProps) => {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: "",
    biography: "",
    birthDate: "",
    nationality: "",
    email: "",
    website: "",
    genres: [],
  });

  interface FormErrors {
    [key: string]: string | undefined;
  }

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        biography: author.biography,
        birthDate: author.birthDate,
        nationality: author.nationality,
        email: author.email,
        website: author.website || "",
        genres: author.genres,
      });
    }
  }, [author]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "genres") {
      setFormData({
        ...formData,
        genres: value
          .split(",")
          .map((genre) => genre.trim())
          .filter(Boolean),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authorsApi.update(author.id, formData);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error updating author:", error);
      setErrors({
        submit: "Failed to update author. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                      Update Author
                    </Dialog.Title>

                    {errors.submit && (
                      <div className="mt-2 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                        <p className="text-sm text-red-700 dark:text-red-200">
                          {errors.submit}
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <FormInput
                          label="Name"
                          placeholder="Enter author name"
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          icon={UserIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Nationality"
                          placeholder="Enter nationality"
                          id="nationality"
                          name="nationality"
                          type="text"
                          required
                          value={formData.nationality}
                          onChange={handleChange}
                          error={errors.nationality}
                          icon={FlagIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Email"
                          placeholder="Enter email address"
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          icon={EnvelopeIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Website"
                          placeholder="Enter website URL"
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleChange}
                          error={errors.website}
                          icon={GlobeAltIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Birth Date"
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          required
                          value={formData.birthDate}
                          onChange={handleChange}
                          error={errors.birthDate}
                          icon={CalendarIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <FormInput
                          label="Genres"
                          placeholder="Fiction, Mystery, Romance"
                          id="genres"
                          name="genres"
                          type="text"
                          required
                          value={formData.genres.join(", ")}
                          onChange={handleChange}
                          error={errors.genres}
                          icon={TagIcon}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          labelClassName="dark:text-gray-200"
                        />

                        <div className="sm:col-span-2">
                          <FormInput
                            label="Biography"
                            placeholder="Enter author biography"
                            id="biography"
                            name="biography"
                            required
                            value={formData.biography}
                            onChange={handleChange}
                            error={errors.biography}
                            icon={DocumentTextIcon}
                            textArea
                            autoGrow
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            labelClassName="dark:text-gray-200"
                          />
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? "Updating..." : "Update Author"}
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

export default UpdateAuthorModal;
