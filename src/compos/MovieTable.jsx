import React from "react";
import Like from "./common/Like";
import Table from "./common/Table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

const MovieTable = ({ sortColumn, movies, onLike, onDelete, onSort }) => {
  const user = auth.getCurrentUser();

  const columns = [
    { path: "_id", label: "ID" },
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link className="text-decoration-none" to={`/movie/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like movie={movie} onLike={() => onLike(movie._id)} />
      ),
    },
  ];
  if (user && user.isAdmin) {
    columns.push({
      key: "Delete",
      content: (movie) => (
        <button
          className="btn text-bg-danger m-2 rounded"
          onClick={() => onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    });
  }

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
