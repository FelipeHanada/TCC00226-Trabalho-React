export interface PaginationProps {
  currentPage: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  numberOfPages,
  onPageChange,
  loading = false,
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (numberOfPages <= 1) return null;

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < numberOfPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage > 0 && !loading) {
      onPageChange(0);
    }
  };

  const handleLast = () => {
    if (currentPage < numberOfPages - 1 && !loading) {
      onPageChange(numberOfPages - 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(numberOfPages - 1, currentPage + halfVisible);

    // Adjust if we're at the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 0) {
        endPage = Math.min(numberOfPages - 1, startPage + maxVisiblePages - 1);
      } else if (endPage === numberOfPages - 1) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Navegação de comentários">
      <ul className="pagination justify-content-center mb-0">
        {/* First page button */}
        {showFirstLast && currentPage > 0 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleFirst}
              disabled={loading}
              aria-label="Primeira página"
              type="button"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>
        )}

        {/* Previous page button */}
        <li className={`page-item ${!canGoPrevious ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevious}
            disabled={!canGoPrevious || loading}
            aria-label="Página anterior"
            type="button"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* Show ellipsis if there are hidden pages at the beginning */}
        {visiblePages[0] > 0 && (
          <>
            {visiblePages[0] > 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Page number buttons */}
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(page)}
              disabled={loading}
              aria-label={`Página ${page + 1}`}
              aria-current={page === currentPage ? "page" : undefined}
              type="button"
            >
              {page + 1}
            </button>
          </li>
        ))}

        {/* Show ellipsis if there are hidden pages at the end */}
        {visiblePages[visiblePages.length - 1] < numberOfPages - 1 && (
          <>
            {visiblePages[visiblePages.length - 1] < numberOfPages - 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}

        {/* Next page button */}
        <li className={`page-item ${!canGoNext ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handleNext}
            disabled={!canGoNext || loading}
            aria-label="Próxima página"
            type="button"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>

        {/* Last page button */}
        {showFirstLast && currentPage < numberOfPages - 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleLast}
              disabled={loading}
              aria-label="Última página"
              type="button"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
