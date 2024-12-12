interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const getStrength = (): {
    strength: number;
    label: string;
    color: string;
  } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very Strong", color: "bg-green-600" },
    };
    // @ts-ignore
    return { strength, ...strengthMap[strength] };
  };

  const { strength, label, color } = getStrength();

  return (
    <div className="mt-1">
      <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 ${
              index < strength ? color : ""
            } transition-all duration-300`}
          />
        ))}
      </div>
      <p
        className={`mt-1 text-xs ${
          strength > 2 ? "text-green-600" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
};
