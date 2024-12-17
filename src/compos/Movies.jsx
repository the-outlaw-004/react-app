import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    function fetchMovies() {
      const fetchedMovies = getMovies();
      setMovies(fetchedMovies);
    }
    fetchMovies();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //   const readableDate = (dateString) => {
  //     const date = new Date(dateString);

  //     return date.toLocaleString("en-US", {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     });
  //   };

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie._id !== id));
  };

  const handleLike = (id) => {
    setMovies(
      movies.map((m) => {
        return m._id === id ? { ...m, isLiked: !m.isLiked } : m;
      })
    );
  };

  const labels = ["id", "title", "genre", "numberInStock", "dailyRentalRate"];

  const paginatedMovies = paginate(movies, currentPage, pageSize);

  return (
    <div className="">
      {movies.length > 0 ? (
        <p>
          Showing
          {movies.length > 1
            ? " " + movies.length + " movies "
            : " " + movies.length + " movie "}
          in the Database
        </p>
      ) : (
        <p>There are no movies in the Database</p>
      )}
      {movies.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {labels.length > 0 &&
                labels.map((key) => (
                  <th
                    className="text-capitalize text-center border-b-3"
                    key={key}
                  >
                    {key}
                  </th>
                ))}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.length > 0 &&
              paginatedMovies.map((movie) => (
                <tr key={movie._id}>
                  <td className="text-center">{movie._id}</td>
                  <td className="text-center">{movie.title}</td>
                  <td className="text-center">{movie.genre.name}</td>
                  <td className="text-center">{movie.numberInStock}</td>
                  <td className="text-center">{movie.dailyRentalRate}</td>
                  <td className="text-center">
                    <Like movie={movie} onLike={() => handleLike(movie._id)} />
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger p-2 rounded"
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                  {/* <td className="text-center">
                  {
                    //   readableDate(movie.publishDate) ||
                    readableDate(movies[0].publishDate)
                  }
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={movies.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Movies;
