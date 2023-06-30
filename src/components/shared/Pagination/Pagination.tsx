"use client";
import { useRouter } from "next/router";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();

  const renderPageLink = (page: number, label: string) => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              page,
            },
          });
        }}
      >
        {label}
      </button>
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
        {currentPage} of {totalPages}
      </div>
      {renderNextLink()}
    </div>
  );
};

export default Pagination;
