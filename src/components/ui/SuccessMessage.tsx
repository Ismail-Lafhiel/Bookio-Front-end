interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => (
  <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
    {message}
  </div>
);
