import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface FormFileInputProps {
  label: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

export const FormFileInput: React.FC<FormFileInputProps> = ({
  label,
  id,
  name,
  onChange,
  error,
  required,
  className,
  labelClassName,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="file"
          name={name}
          id={id}
          onChange={onChange}
          required={required}
          className={`block w-full pr-10 ${className}`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormFileInput;
