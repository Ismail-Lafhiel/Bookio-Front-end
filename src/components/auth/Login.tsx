// src/components/auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FormInput } from "../UI/FormInput";
import { Button } from "../UI/Button";
import FormErrors from "../../interfaces/formError";
import LoginForm from "../../interfaces/loginForm";
import { validateEmail, validatePassword } from "../../interfaces/validation";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
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
    };

    // Remove undefined errors
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password);
      toast.success("Successfully logged in!");
      navigate("/app/profile");
    } catch (error: any) {
      if (error.message === "UserNotConfirmedException") {
        toast.error("Please verify your email first");
        navigate("/verify-email", {
          state: { email: formData.email },
          replace: true,
        });
      } else {
        toast.error(error.message || "Failed to login");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center py-16 md:py-20 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary dark:text-primary dark:hover:text-primary"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              icon={LockClosedIcon}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              labelClassName="dark:text-gray-200"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary hover:text-primary dark:text-primary dark:hover:text-primary"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
