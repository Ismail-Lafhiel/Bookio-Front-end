// src/utils/formatDate.ts

/**
 * Formats a date string into a more readable format
 * @param dateString - Date string in any valid format (ISO 8601, etc.)
 * @param options - Optional Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Use Intl.DateTimeFormat for localized date formatting
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Example usage with different format options:
export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateNumeric = (dateString: string): string => {
  return formatDate(dateString, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
