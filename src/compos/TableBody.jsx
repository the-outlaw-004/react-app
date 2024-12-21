import React from "react";
// import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.length > 0 &&
        data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => {
              if (column.content)
                return <td key={item._id + column.key}>{column.content(item)}</td>;
              if (column?.path && column?.path?.includes(".")) {
                const genreAndName = column.path.split(".");
                let genre = genreAndName[0];
                let name = genreAndName[1];
                return (
                  <td
                    key={item._id + (column.path || column.key)}
                    className="text-center"
                  >
                    {item[genre][name]}
                  </td>
                );
              } else
                return (
                  <td
                    key={item._id + (column.path || column.key)}
                    className="text-center"
                  >
                    {/* {column.path === "title" ? (
                      <Link
                        to={`/movie/${item._id}`}
                        className="text-decoration-none"
                      >
                        {item[column.path]}
                      </Link>
                    ) : ( */}
                      {item[column.path]}
                    {/* )} */}
                  </td>
                );
            })}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
