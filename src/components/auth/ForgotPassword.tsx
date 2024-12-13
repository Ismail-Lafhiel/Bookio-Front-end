// src/components/auth/ForgotPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";

interface ForgotPasswordForm {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, isLoading } = useAuth();
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    try {
      await forgotPassword(formData.email);
      toast.success("Verification code sent to your email");
      // Redirect to ResetPassword with email
      navigate("/reset-password", {
        state: { email: formData.email },
        replace: true,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a verification code
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email address"
            placeholder="Enter your email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={EnvelopeIcon}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Send Reset Code
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Back to login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
