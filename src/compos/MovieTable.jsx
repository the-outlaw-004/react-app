import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Like from "./common/Like";
import Table from "./common/Table";

const MovieTable = ({ sortColumn, movies, onLike, onDelete, onSort }) => {
  const columns = [
    { path: "_id", label: "ID" },
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like movie={movie} onLike={() => onLike(movie._id)} />
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn text-bg-danger m-2 rounded"
          onClick={() => onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <Table
      sortColumn={sortColumn}
      columns={columns}
      onSort={onSort}
      data={movies}
    />
  );
};

export default MovieTable;
