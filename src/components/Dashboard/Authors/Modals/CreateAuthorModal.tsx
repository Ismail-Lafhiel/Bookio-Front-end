import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FormInput } from "../../../UI/FormInput";
import { FormFileInput } from "../../../UI/FormFileInput";
import {
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
  EnvelopeIcon,
  FlagIcon,
  XMarkIcon as HiX,
} from "@heroicons/react/24/outline";

import { authorsApi } from "../../../../services/apiService";
import { toast } from "react-hot-toast";
import {
  Author,
  AuthorFormData,
  CreateAuthorModalProps,
  SocialMedia,
} from "../../../../interfaces/author";

const CreateAuthorModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateAuthorModalProps) => {
  const initialFormData: AuthorFormData = {
    name: "",
    biography: "",
    birthDate: "",
    nationality: "",
    email: "",
    genres: [],
    socialMedia: {
      facebook: "",
      twitter: "",
      website: "",
    },
  };

  const [formData, setFormData] = useState<AuthorFormData>(initialFormData);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [genreInput, setGenreInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.biography.trim()) {
      newErrors.biography = "Biography is required";
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    }

    // Validate genres
    if (!Array.isArray(formData.genres)) {
      newErrors.genres = "Genres must be an array";
    } else if (formData.genres.length === 0) {
      newErrors.genres = "At least one genre is required";
    } else if (formData.genres.some((genre) => !genre.trim())) {
      newErrors.genres = "Empty genres are not allowed";
    }

    // Validate social media URLs if provided
    Object.entries(formData.socialMedia).forEach(([platform, url]) => {
      if (url && !isValidUrl(url)) {
        newErrors[`socialMedia.${platform}`] = `Invalid ${platform} URL`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
    // Clear error when field is modified
    if (errors[`socialMedia.${name}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`socialMedia.${name}`];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          profilePicture: "File size must be less than 5MB",
        }));
        return;
      }
      setProfilePicture(file);
      // Clear error when valid file is selected
      if (errors.profilePicture) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.profilePicture;
          return newErrors;
        });
      }
    }
  };

  const handleAddGenre = () => {
    const trimmedGenre = genreInput.trim();
    if (trimmedGenre && !formData.genres.includes(trimmedGenre)) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, trimmedGenre],
      }));
      setGenreInput("");
      if (errors.genres) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.genres;
          return newErrors;
        });
      }
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setProfilePicture(null);
    setGenreInput("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty social media links
      const filteredSocialMedia: SocialMedia = {};
      Object.entries(formData.socialMedia).forEach(([key, value]) => {
        if (value.trim()) {
          filteredSocialMedia[key as keyof SocialMedia] = value.trim();
        }
      });

      // Create the author data object
      const authorData: Partial<Author> = {
        name: formData.name,
        biography: formData.biography,
        birthDate: formData.birthDate,
        nationality: formData.nationality,
        email: formData.email,
        genres: formData.genres.filter((genre) => genre.trim() !== ""), // Filter out empty genres
        socialMedia:
          Object.keys(filteredSocialMedia).length > 0
            ? filteredSocialMedia
            : undefined,
      };

      // Create FormData and properly append arrays and objects
      const formDataToSend = new FormData();
      Object.entries(authorData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "genres") {
            // Handle genres array
            formDataToSend.append("genres", JSON.stringify(value));
          } else if (key === "socialMedia") {
            // Handle socialMedia object
            formDataToSend.append("socialMedia", JSON.stringify(value));
          } else {
            formDataToSend.append(key, value as string);
          }
        }
      });

      if (profilePicture) {
        formDataToSend.append("profilePicture", profilePicture);
      }

      const response = await authorsApi.create(
        authorData,
        profilePicture || undefined
      );

      await onSubmit(response.data);
      toast.success("Author created successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating author:", error);
      toast.error(
        "Failed to create author. Please make sure all fields are correct."
      );
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create author. Please check all required fields.",
      }));
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
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      Create New Author
                    </Dialog.Title>

                    {errors.submit && (
                      <div
                        className="mt-2 rounded-md bg-red-50 dark:bg-red-900/20 p-4"
                        role="alert"
                      >
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
                          minLength={2}
                          maxLength={100}
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
                          minLength={2}
                          maxLength={100}
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

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Genres
                          </label>
                          <div className="flex items-center mt-1">
                            <input
                              type="text"
                              value={genreInput}
                              onChange={(e) => setGenreInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddGenre();
                                }
                              }}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                              placeholder="Add a genre"
                              aria-label="Add a genre"
                            />
                            <button
                              type="button"
                              onClick={handleAddGenre}
                              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                              aria-label="Add genre"
                            >
                              Add
                            </button>
                          </div>
                          <div
                            className="mt-2 flex flex-wrap gap-2"
                            role="list"
                            aria-label="Selected genres"
                          >
                            {formData.genres.map((genre) => (
                              <span
                                key={genre}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light"
                              >
                                {genre}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGenre(genre)}
                                  className="ml-1 text-xs text-red-500 hover:text-red-700"
                                  aria-label={`Remove ${genre}`}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </span>
                            ))}
                          </div>
                          {errors.genres && (
                            <p
                              className="mt-2 text-sm text-red-600"
                              role="alert"
                            >
                              {errors.genres}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Social Media Links
                          </label>
                          <FormInput
                            label="Facebook"
                            placeholder="Enter Facebook URL"
                            id="facebook"
                            name="facebook"
                            type="url"
                            value={formData.socialMedia.facebook}
                            onChange={handleSocialMediaChange}
                            error={errors["socialMedia.facebook"]}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            labelClassName="dark:text-gray-200"
                          />
                          <FormInput
                            label="Twitter"
                            placeholder="Enter Twitter URL"
                            id="twitter"
                            name="twitter"
                            type="url"
                            value={formData.socialMedia.twitter}
                            onChange={handleSocialMediaChange}
                            error={errors["socialMedia.twitter"]}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            labelClassName="dark:text-gray-200"
                          />
                          <FormInput
                            label="Website"
                            placeholder="Enter Website URL"
                            id="website"
                            name="website"
                            type="url"
                            value={formData.socialMedia.website}
                            onChange={handleSocialMediaChange}
                            error={errors["socialMedia.website"]}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            labelClassName="dark:text-gray-200"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <FormInput
                            label="Biography"
                            placeholder="Enter author biography"
                            id="biography"
                            name="biography"
                            required
                            minLength={10}
                            maxLength={2000}
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

                        <div className="sm:col-span-2">
                          <FormFileInput
                            label="Profile Picture"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={handleFileChange}
                            error={errors.profilePicture}
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
                          {isLoading ? "Creating..." : "Create Author"}
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

export default CreateAuthorModal;
