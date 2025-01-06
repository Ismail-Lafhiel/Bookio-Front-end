import { FC } from "react";
import { HiStar } from "react-icons/hi";

interface BookCardProps {
  title: string;
  author: string;
  rating: number;
  borrowCount: number;
  coverImage: string;
  category: string;
}

const BookCard: FC<BookCardProps> = ({
  title,
  author,
  rating,
  borrowCount,
  coverImage,
  category,
}) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm">
    <img
      src={coverImage}
      alt={title}
      className="w-16 h-24 object-cover rounded-md shadow-sm"
    />
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
        {title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{author}</p>
      <div className="mt-2 flex items-center">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <HiStar
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="mt-1 flex items-center text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {borrowCount} borrows • {category}
        </span>
      </div>
    </div>
  </div>
);

export default BookCard;