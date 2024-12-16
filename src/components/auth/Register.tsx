import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CalendarIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { signUp } from "aws-amplify/auth";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";

import toast from "react-hot-toast";
import RegisterForm from "../../interfaces/registerForm";
import FormErrors from "../../interfaces/formError";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../interfaces/validation";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    preferredUsername: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      firstName: validateRequired(formData.firstName, "First name"),
      lastName: validateRequired(formData.lastName, "Last name"),
      preferredUsername: validateRequired(
        formData.preferredUsername,
        "Username"
      ),
      birthdate: validateRequired(formData.birthdate, "Birth date"),
    };

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.birthdate) {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthdate = "Birth date cannot be in the future";
      }
    }

    Object.keys(newErrors).forEach(
      (key) =>
        newErrors[key as keyof FormErrors] === undefined &&
        delete newErrors[key as keyof FormErrors]
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstName,
            family_name: formData.lastName,
            preferred_username: formData.preferredUsername,
            birthdate: formData.birthdate,
            updated_at: String(Math.floor(Date.now() / 1000)),
          },
        },
      });

      toast.success("Registration successful! Please verify your email.");
      navigate("/verify-email", {
        state: {
          username: formData.email,
          email: formData.email,
        },
        replace: true,
      });
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email and Username in one row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                icon={EnvelopeIcon}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Enter your email"
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />

              <FormInput
                label="Username"
                id="preferredUsername"
                name="preferredUsername"
                type="text"
                autoComplete="username"
                required
                icon={IdentificationIcon}
                value={formData.preferredUsername}
                onChange={handleChange}
                error={errors.preferredUsername}
                placeholder="Choose a username"
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />
            </div>

            {/* First Name and Last Name in one row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="First name"
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                icon={UserIcon}
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="Enter your first name"
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />

              <FormInput
                label="Last name"
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                icon={UserIcon}
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Enter your last name"
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />
            </div>

            {/* Birth date taking full width */}
            <FormInput
              label="Birth date"
              id="birthdate"
              name="birthdate"
              type="date"
              required
              icon={CalendarIcon}
              value={formData.birthdate}
              onChange={handleChange}
              error={errors.birthdate}
              max={new Date().toISOString().split("T")[0]}
              className="dark:bg-gray-700 dark:text-white"
              labelClassName="dark:text-gray-200"
            />

            {/* Password and Confirm Password in one row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                icon={LockClosedIcon}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter your password"
                showPasswordStrength
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />

              <FormInput
                label="Confirm password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                icon={LockClosedIcon}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                labelClassName="dark:text-gray-200"
              />
            </div>

            {/* Submit button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full"
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
