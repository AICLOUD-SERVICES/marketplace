"use client";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const renderPageLink = (page: number, label: string) => {
    const updatedUrl = `/showroom?page=${page}`;
    return (
      <Link
        href={updatedUrl}
        key={page}
        className={currentPage === page ? "active" : ""}
      >
        {label}
      </Link>
    );
  };

  const renderPreviousLink = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      return renderPageLink(previousPage, "Previous");
    }
    return <span className="text-gray-400">Previous</span>;
  };

  const renderNextLink = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      return renderPageLink(nextPage, "Next");
    }
    return <span className="text-gray-400">Next</span>;
  };

  return (
    <div className="flex items-center justify-center gap-2 my-4 text-xs">
      {renderPreviousLink()}
      <div>
        {currentPage}/{totalPages}
      </div>
      {renderNextLink()}
    </div>
  );
};

export default Pagination;
