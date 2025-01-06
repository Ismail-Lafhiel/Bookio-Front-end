// FormSelect.tsx
import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  options: Option[];
  placeholder?: string;
  showValidation?: boolean;
  helperText?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      icon: Icon,
      required = false,
      className = "",
      labelClassName = "",
      options,
      placeholder = "Select an option",
      showValidation = true,
      helperText,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const isValid = isTouched && !error && props.value;

    return (
      <div className="relative">
        <label
          htmlFor={props.id}
          className={twMerge(
            "block text-sm font-medium mb-1 transition-colors duration-200",
            error
              ? "text-red-500"
              : isValid
              ? "text-green-600"
              : isFocused
              ? "text-primary dark:text-primary"
              : "text-gray-700 dark:text-gray-200",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <div
            className={twMerge(
              "relative rounded-md shadow-sm transition-all duration-200",
              isFocused && "ring-2 ring-offset-0",
              error
                ? "ring-red-500"
                : isValid
                ? "ring-green-500"
                : isFocused
                ? "ring-primary"
                : ""
            )}
          >
            {Icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  className={twMerge(
                    "h-5 w-5 transition-colors duration-200",
                    error
                      ? "text-red-400 dark:text-red-400"
                      : isValid
                      ? "text-green-500 dark:text-green-400"
                      : isFocused
                      ? "text-primary dark:text-primary"
                      : "text-gray-400 dark:text-gray-500"
                  )}
                  aria-hidden="true"
                />
              </div>
            )}
            <select
              ref={ref}
              {...props}
              className={twMerge(
                "block w-full rounded-md border transition-all duration-200",
                "text-sm placeholder:text-gray-400",
                "focus:outline-none focus:ring-0",
                Icon ? "pl-10" : "pl-4",
                "pr-10 py-2.5",
                error
                  ? "border-red-600 text-red-900 placeholder-red-400 dark:border-red-500 dark:placeholder-red-600 dark:text-red-600"
                  : isValid
                  ? "border-green-400 text-green-900 placeholder-green-400 dark:border-green-600 dark:placeholder-green-600"
                  : "border-gray-400 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:placeholder-gray-600",
                isFocused && !error && !isValid && "border-primary",
                "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
                className
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false);
                setIsTouched(true);
                props.onBlur?.(e);
              }}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
              {showValidation && (
                <>
                  {error && isTouched ? (
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  ) : isValid ? (
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : null}
                </>
              )}
            </div>
          </div>

          {/* Error or helper text */}
          {(error || helperText) && (
            <div className="mt-1.5 text-sm">
              {error ? (
                <p className="text-red-500 animate-slideIn">{error}</p>
              ) : (
                <p className="text-gray-500">{helperText}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
