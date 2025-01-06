interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
    {message}
  </div>
);
