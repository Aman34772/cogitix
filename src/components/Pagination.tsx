import { PaginationType } from "@/types/character";
import React, { useState } from "react";

const Pagination: React.FC<PaginationType> = ({
  currentPage,
  setPage,
  totalPage,
}) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const generateVisiblePages = (current: number, total: number) => {
    const pages = [];
    const startPage = Math.max(1, current - 2);
    const endPage = Math.min(total, current + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setVisiblePages(pages);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    generateVisiblePages(page, totalPage);
  };

  React.useEffect(() => {
    generateVisiblePages(currentPage, totalPage);
  }, [currentPage, totalPage]);

  return (
    <div className="w-auto flex gap-2 items-center bg-gray-800 text-black">
      {currentPage > 1 && (
        <button
          className="px-2 py-1 rounded-sm bg-gray-300 text-sm font-medium"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`px-2 py-1 rounded-sm text-sm font-medium ${
            page === currentPage ? "bg-indigo-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPage && (
        <button
          className="px-2 py-1 rounded-sm bg-gray-300 text-sm font-medium"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
