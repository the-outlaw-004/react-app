import React from "react";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.length > 0 &&
        data.map((item) => (
          <tr key={item._id}>
            {/* <td className="text-center">{movie._id}</td>
            <td className="text-center">{movie.title}</td>
            <td className="text-center">{movie.genre.name}</td>
            <td className="text-center">{movie.numberInStock}</td>
            <td className="text-center">{movie.dailyRentalRate}</td>
            <td className="text-center">
            <Like movie={movie} onLike={() => onLike(movie._id)} />
            </td>
            <td className="text-center"></td> */}
            {columns.map((column) => {
              if (column.content)
                return <td key={column.key}>{column.content(item)}</td>;
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
                    {item[column.path]}
                  </td>
                );
            })}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
