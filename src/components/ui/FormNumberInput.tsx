import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface FormNumberInputProps {
  label: string;
  id: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

export const FormNumberInput: React.FC<FormNumberInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  min,
  max,
  step,
  required,
  placeholder,
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
          type="number"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          required={required}
          placeholder={placeholder}
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
