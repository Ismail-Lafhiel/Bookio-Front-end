interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<any>;
  helperText?: string;
  showValidation?: boolean;
  required?: boolean;
  showPasswordStrength?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  allowCopy?: boolean;
  mask?: string;
  suggestions?: string[];
  autoGrow?: boolean;
  textArea?: boolean;
  labelClassName?: string;
}

export default FormInputProps;
