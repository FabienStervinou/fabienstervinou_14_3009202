import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination.js';
import './index.scss';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className='pagination'>
      <div className="pagination-info">
        {(pageSize * currentPage) - 9} - 
        {((pageSize * currentPage) > totalCount ? totalCount : pageSize * currentPage) + ' '}
      of {totalCount}
      </div>
      <ul
        className={classnames('pagination-container', { [className]: className })}
      >
        {/* Left navigation arrow */}
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === 1
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots" key={idx}>&#8230;</li>;
          }

          // Render our Page Pills
          return (
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage
              })}
              onClick={() => onPageChange(pageNumber)}
              key={idx}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === lastPage
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  className: PropTypes.string
};

export default Pagination;
