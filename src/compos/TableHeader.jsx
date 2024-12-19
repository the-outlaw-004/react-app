import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (orderBy) => {
    let order = "desc";
    if (sortColumn.orderBy === orderBy) {
      order = sortColumn.order === "desc" ? "asc" : "desc";
    }
    onSort({ ...sortColumn, orderBy: orderBy, order: order });
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.orderBy)
      // return (
      //   <svg
      //     xmlns="http://www.w3.org/2000/svg"
      //     viewBox="0 0 320 512"
      //     style={{ height: "12px", width: "12px" }}
      //   >
      //     <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8L32 224c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
      //   </svg>
      // );
      return null;
    if (sortColumn.order === "asc")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "12px", width: "12px" }}
          viewBox="0 0 320 512"
        >
          <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
        </svg>
      );

    return (
      <svg
        style={{ height: "12px", width: "12px" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
      </svg>
    );
  };

  return (
    <thead>
      <tr>
        {columns.length > 0 &&
          columns.map((column) => (
            <th
              className="text-capitalize text-center border-b-3"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {column.path && renderSortIcon(column)}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
