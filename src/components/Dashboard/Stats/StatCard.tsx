import { FC } from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  changeType?: "increase" | "decrease";
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeText,
  changeType,
}) => (
  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-primary-light dark:bg-primary-dark text-white">
          {icon}
        </div>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
      {change !== undefined && (
        <div className="mt-2 flex items-center">
          {changeType === "increase" ? (
            <HiArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <HiArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm font-medium ${
              changeType === "increase" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}%
          </span>
          {changeText && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {changeText}
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
