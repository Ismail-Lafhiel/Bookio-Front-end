import { 
  ExclamationCircleIcon, 
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { forwardRef, useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import FormInputProps from "../../interfaces/FormInputProps";



export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    error, 
    icon: Icon, 
    helperText,
    showValidation = true,
    required = false,
    showPasswordStrength = false,
    showCharCount = false,
    maxLength,
    allowCopy = false,
    mask,
    suggestions = [],
    autoGrow = false,
    textArea = false,
    className = "", 
    ...props 
  }, ref) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const isValid = isDirty && !error && props.value;
    const isPassword = props.type === "password";
    const inputValue = props.value as string || "";

    // Auto-grow textarea
    useEffect(() => {
      if (autoGrow && textArea && textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, [inputValue, autoGrow, textArea]);

    // Handle input masking
    const handleMaskedInput = (value: string) => {
      if (!mask) return value;

      let maskedValue = "";
      let valueIndex = 0;

      for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
        if (mask[i] === "#") {
          if (/\d/.test(value[valueIndex])) {
            maskedValue += value[valueIndex];
            valueIndex++;
          }
        } else if (mask[i] === "A") {
          if (/[a-zA-Z]/.test(value[valueIndex])) {
            maskedValue += value[valueIndex];
            valueIndex++;
          }
        } else {
          maskedValue += mask[i];
          if (mask[i] === value[valueIndex]) {
            valueIndex++;
          }
        }
      }

      return maskedValue;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsDirty(true);
      
      if (mask) {
        const maskedValue = handleMaskedInput(e.target.value);
        e.target.value = maskedValue;
      }

      if (suggestions.length > 0) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0 && e.target.value.length > 0);
      }

      props.onChange?.(e as any);
    };

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(inputValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text:", err);
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      const event = {
        target: { name: props.name, value: suggestion }
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
      setShowSuggestions(false);
    };

    const InputComponent = textArea ? "textarea" : "input";

    return (
      <div className="relative">
        <label
          htmlFor={props.id}
          className={twMerge(
            "block text-sm font-medium mb-1 transition-colors duration-200",
            error ? "text-red-500" : 
            isValid ? "text-green-600" : 
            isFocused ? "text-indigo-600" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {showCharCount && maxLength && (
            <span className="ml-2 text-xs text-gray-400">
              {inputValue.length}/{maxLength}
            </span>
          )}
        </label>
        <div className="relative">
          <div className={twMerge(
            "relative rounded-md shadow-sm transition-all duration-200",
            isFocused && "ring-2 ring-offset-0",
            error ? "ring-red-500" : 
            isValid ? "ring-green-500" : 
            isFocused ? "ring-indigo-500" : ""
          )}>
            {Icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon
                  className={twMerge(
                    "h-5 w-5 transition-colors duration-200",
                    error ? "text-red-400" : 
                    isValid ? "text-green-500" : 
                    isFocused ? "text-indigo-500" : "text-gray-400"
                  )}
                  aria-hidden="true"
                />
              </div>
            )}
            <InputComponent
              {...props}
              // @ts-ignore
              ref={textArea ? textAreaRef : ref}
              type={isPassword ? (showPassword ? "text" : "password") : props.type}
              className={twMerge(
                "block w-full rounded-md border transition-all duration-200",
                "text-sm placeholder:text-gray-400",
                "focus:outline-none focus:ring-0",
                Icon ? "pl-10" : "pl-4",
                "pr-10 py-2.5",
                error
                  ? "border-red-300 text-red-900 placeholder-red-300"
                  : isValid
                  ? "border-green-300 text-gray-900"
                  : "border-gray-300 text-gray-900",
                isFocused && !error && !isValid && "border-indigo-500",
                "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
                textArea && "resize-none",
                className
              )}
              onChange={handleChange}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e as any);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                setIsTouched(true);
                props.onBlur?.(e as any);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              )}
              {allowCopy && inputValue && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5" />
                  )}
                </button>
              )}
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
          
          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
              <ul className="max-h-60 overflow-auto py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Error or helper text */}
        {(error || helperText) && (
          <div className="mt-1.5 text-sm">
            {error ? (
              <p className="text-red-500 animate-slideIn">
                {error}
              </p>
            ) : (
              <p className="text-gray-500">
                {helperText}
              </p>
            )}
          </div>
        )}

        {/* Password strength indicator */}
        {showPasswordStrength && isPassword && inputValue && (
          <PasswordStrengthIndicator password={inputValue} />
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";