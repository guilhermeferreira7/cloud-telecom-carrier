"use client";

import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

type PaginationProps = {
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
};

export function Pagination({ page, setPage, lastPage }: PaginationProps) {
  return (
    <ul className="pagination justify-content-end">
      <li className="page-item">
        <button
          className={`page-link ${page === 1 ? "disabled" : ""}`}
          disabled={page === 1}
          onClick={() => {
            setPage(1);
          }}
        >
          <AiOutlineDoubleLeft />
        </button>
      </li>

      <li className="page-item">
        <button
          className={`page-link ${page === 1 ? "disabled" : ""}`}
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          <AiOutlineLeft />
        </button>
      </li>

      <li className="page-item">
        <button className="page-link">{page}</button>
      </li>

      <li className="page-item">
        <button
          className={`page-link ${page === lastPage ? "disabled" : ""}`}
          disabled={page === lastPage}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <AiOutlineRight />
        </button>
      </li>

      <li className="page-item">
        <button
          className={`page-link ${page === lastPage ? "disabled" : ""}`}
          disabled={page === lastPage}
          onClick={() => {
            setPage(lastPage);
          }}
        >
          <AiOutlineDoubleRight />
        </button>
      </li>
    </ul>
  );
}
