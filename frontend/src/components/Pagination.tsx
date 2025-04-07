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
  return (
    <>
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center gap-2 my-4 flex-wrap">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ◀ Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>

      {/* Results Per Page */}
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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
};

export default Pagination;
