import React from "react";
import PropTypes from "prop-types";
import "./Paginate.scss";

const Paginate = (props) => {
  const { currentPage, totalPages, paginate } = props;
  return (
    <>
      <span className="page-count">
        {currentPage} - {totalPages}
      </span>
      <button
        className={currentPage > 1 ? "paginate-button" : "paginate-button disable"}
        onClick={() => paginate("prev")}
      >
        Prev
      </button>
      <button
        className={totalPages === currentPage ? "paginate-button disable" : "paginate-button"}
        onClick={() => paginate("next")}
      >
        Next
      </button>
    </>
  );
};

export default Paginate;

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};
