import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.number),
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};

const defaultProps = {
  items: [],
  initialPage: 1,
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    const { items, initialPage } = this.props;
    // set page if items array isn't empty
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    const { items, initialPage } = this.props;
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage(page) {
    const { items, onChangePage } = this.props;
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    } // get new pager object for specified page

    pager = this.getPager(items.length, page); // get new page of items from items array

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1); // update state

    this.setState({ pager }); // call change page function in parent component

    onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    const newCurrentPage = currentPage || 1; // default page size is 10

    const newPageSize = pageSize || 10; // calculate total pages

    const totalPages = Math.ceil(totalItems / newPageSize);

    let startPage;

    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (newCurrentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (newCurrentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = newCurrentPage - 5;
        endPage = newCurrentPage + 4;
      }
      console.log(startPage, endPage);
    } // calculate start and end item indexes

    const startIndex = (newCurrentPage - 1) * newPageSize;
    const endIndex = Math.min(startIndex + newPageSize - 1, totalItems - 1); // create an array of pages to ng-repeat in the pager control

    const pages = _.range(startPage, endPage + 1); // return object with all pager properties required by the view

    return {
      totalItems,
      newCurrentPage,
      newPageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  render() {
    const { pager } = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a role="button" tabIndex="-1" onClick={() => this.setPage(1)}>
            Første
          </a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a
            role="button"
            tabIndex="-1"
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            Tilbage
          </a>
        </li>
        {pager.pages.map(page => (
          <li
            key={`${page}`}
            className={pager.currentPage === page ? 'active' : ''}
          >
            <a role="button" tabIndex="-1" onClick={() => this.setPage(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <a
            role="button"
            tabIndex="-1"
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            Frem
          </a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
        >
          <a
            role="button"
            tabIndex="-1"
            onClick={() => this.setPage(pager.totalPages)}
          >
            Sidste
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
