interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 4) {
      pages.push('ellipsis-start');
    }

    // Determine middle page range
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('ellipsis-end');
    }

    // Always show last page if more than 1
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToShow = generatePageNumbers();

  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-2 my-4 flex-wrap">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ◀ Previous
        </button>

        {pagesToShow.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              className={`btn ${currentPage === page ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="mx-1" style={{ color: '#666' }}>
              ...
            </span>
          )
        )}

        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>

      <div className="d-flex align-items-center gap-2 mb-5">
        <label htmlFor="pageSizeSelect" className="form-label mb-0">
          Results per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </>
  );
};

export default Pagination;
