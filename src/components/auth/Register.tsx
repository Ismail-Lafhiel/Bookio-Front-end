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
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../interfaces/Validation";
import toast from "react-hot-toast";
import RegisterForm from "../../interfaces/registerForm";
import FormErrors from "../../interfaces/formError";

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

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
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
