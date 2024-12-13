// src/components/auth/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";

interface ResetPasswordForm {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  code?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmForgotPassword, isLoading } = useAuth();
  const [formData, setFormData] = useState<ResetPasswordForm>({
    email: location.state?.email || "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [location.state, navigate]);

  const validateCode = (code: string): string | undefined => {
    if (!code.trim()) {
      return "Verification code is required";
    }
    if (!/^\d+$/.test(code)) {
      return "Code must contain only numbers";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
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

    // Validate confirm password in real-time
    if (
      name === "confirmPassword" ||
      (name === "newPassword" && formData.confirmPassword)
    ) {
      if (name === "newPassword" && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (name === "confirmPassword" && value !== formData.newPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    const codeError = validateCode(formData.code);
    if (codeError) newErrors.code = codeError;

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) newErrors.newPassword = passwordError;

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await confirmForgotPassword(
        formData.email,
        formData.code,
        formData.newPassword
      );
      toast.success("Password reset successfully");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the verification code and your new password
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Verification Code"
            id="code"
            name="code"
            type="text"
            required
            value={formData.code}
            onChange={handleChange}
            error={errors.code}
            placeholder="Enter verification code"
          />

          <FormInput
            label="New Password"
            id="newPassword"
            name="newPassword"
            type="password"
            required
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            icon={LockClosedIcon}
          />

          <FormInput
            label="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={LockClosedIcon}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Reset Password
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

export default ResetPassword;
