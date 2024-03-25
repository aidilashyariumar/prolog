

import React from 'react';

const Pagination = ({ totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalItems; i++) {
    pageNumbers.push({
      number: i,
      isActive: i === currentPage,
    });
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination">
      <button
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Sebelumnya
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber.number}
          className={`page-number ${pageNumber.isActive ? 'active' : ''}`}
          onClick={() => handlePageChange(pageNumber.number)}
        >
          {pageNumber.number}
        </button>
      ))}

      <button
        className={`next ${currentPage === totalItems ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default Pagination;