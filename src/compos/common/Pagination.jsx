import React from "react";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  //   const [active, setActive] = useState(1);
  console.log(itemsCount, pageSize);
  const pages = Math.ceil(itemsCount / pageSize);
  console.log(pages);
  if (pages === 1) return null;
  const array = Array.from({ length: pages }, (v, i) => i + 1);
  return (
    <nav>
      <ul className="pagination">
        <li
          key="previous"
          className="page-item"
          onClick={() => {
            onPageChange(currentPage > 1 ? currentPage - 1 : currentPage);
          }}
        >
          <button className="page-link">Prev</button>
        </li>
        {array.map((item) => (
          <li
            key={item}
            className={`page-item ${currentPage === item && "active"}`}
            onClick={() => {
              onPageChange(item);
            }}
          >
            <button className="page-link">{item}</button>
          </li>
        ))}
        <li
          key="next"
          className="page-item"
          onClick={() => {
            onPageChange(currentPage < pages ? currentPage + 1 : currentPage);
          }}
        >
          <button className="page-link">Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
