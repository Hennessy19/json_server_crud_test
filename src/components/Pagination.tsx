import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = [];
  
  // Create page number array
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Limit visible page numbers for better UI
  let visiblePages: (number | string)[] = pageNumbers;
  
  if (totalPages > 7) {
    if (currentPage <= 4) {
      // Near the start
      visiblePages = [...pageNumbers.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 3) {
      // Near the end
      visiblePages = [1, '...', ...pageNumbers.slice(totalPages - 5)];
    } else {
      // Middle
      visiblePages = [
        1, 
        '...', 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        '...', 
        totalPages
      ];
    }
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>
      
      <div className="page-numbers">
        {visiblePages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`page-number ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;