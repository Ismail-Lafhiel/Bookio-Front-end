// src/components/auth/VerifyEmail.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { Button } from "../ui/Button";
import { FormInput } from "../ui/FormInput";
import { KeyIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

interface LocationState {
  email: string;
}

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if we have the email and password in state
    const state = location.state as LocationState & { password?: string };
    if (!state?.email) {
      toast.error("Please start the registration process again");
      navigate("/register", { replace: true });
      return;
    }
    setEmail(state.email);
    if (state.password) {
      setPassword(state.password);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      if (isSignUpComplete) {
        toast.success("Email verified successfully!");

        if (password) {
          try {
            await login(email, password);
            navigate("/", { replace: true });
            return;
          } catch (loginErr) {
            console.error("Auto-login failed:", loginErr);
          }
        }

        navigate("/login", { replace: true });
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Invalid verification code");
      toast.error(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCountdown > 0) return;

    setLoading(true);
    try {
      await resendSignUpCode({ username: email });
      toast.success("Verification code resent successfully!");
      setResendCountdown(60);
      setError("");
    } catch (err: any) {
      console.error("Error resending code:", err);
      toast.error(err.message || "Error resending verification code");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We sent a verification code to{" "}
          <span className="font-medium text-indigo-600">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              label="Verification code"
              id="code"
              name="code"
              type="text"
              required
              icon={KeyIcon}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              error={error}
              placeholder="Enter verification code"
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                className="w-full"
              >
                Verify Email
              </Button>
            </div>

            <div className="text-sm text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCountdown > 0 || loading}
                className={`font-medium text-indigo-600 hover:text-indigo-500 ${
                  (resendCountdown > 0 || loading) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                {resendCountdown > 0
                  ? `Resend code in ${resendCountdown}s`
                  : "Resend verification code"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Wrong email address?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Start registration again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
