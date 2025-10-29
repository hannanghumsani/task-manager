import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button"; // Assuming Button component is available

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to display (e.g., 1, 2, 3, ..., 10)
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5; // Max number of visible buttons (excluding arrows)
    const boundary = 2; // Pages near the start/end to always show

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first and last page
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    // Filter duplicates and re-add ellipsis correctly
    return pages.filter(
      (value, index, self) =>
        (typeof value === "number" && self.indexOf(value) === index) ||
        (value === "..." && self[index - 1] !== "...")
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center items-center space-x-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
        className="p-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="px-3 py-2 text-gray-500 dark:text-gray-400"
          >
            ...
          </span>
        ) : (
          <Button
            key={index}
            onClick={() => onPageChange(page as number)}
            variant={page === currentPage ? "primary" : "secondary"}
            className="w-10 h-10 text-center"
          >
            {page}
          </Button>
        )
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
        className="p-2"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </nav>
  );
};

export default Pagination;
