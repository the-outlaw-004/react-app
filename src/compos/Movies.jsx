import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MovieTable";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortColumn, setSortColumn] = useState({
    orderBy: "title",
    order: "asc",
  });

  useEffect(() => {
    async function fetchGenres() {
      const data = await getGenres();
      setGenres(data);
    }
    fetchGenres();
  }, []);

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

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (object) => {
    setSortColumn(object);
  };

  const getPageData = () => {
    let filterMovies = movies;
    if (selectedGenre !== "all") {
      filterMovies = filterMovies.filter(
        (movie) => movie.genre.name === selectedGenre.name
      );
    }

    filterMovies.sort((a, b) => {
      if (["numberInStock", "dailyRentalRate"].includes(sortColumn.orderBy)) {
        if (sortColumn.order === "desc") {
          return -(a[sortColumn.orderBy] - b[sortColumn.orderBy]);
        } else {
          return a[sortColumn.orderBy] - b[sortColumn.orderBy];
        }
      } else {
        let aValue = a[sortColumn.orderBy];
        let bValue = b[sortColumn.orderBy];

        if (sortColumn?.orderBy?.includes(".")) {
          const genreAndName = sortColumn.orderBy.split(".");
          aValue = a[genreAndName[0]][genreAndName[1]];
          bValue = b[genreAndName[0]][genreAndName[1]];
        }

        if (sortColumn.order === "desc") {
          return aValue?.toUpperCase() > bValue?.toUpperCase() ? 1 : -1;
        } else {
          return aValue?.toUpperCase() < bValue?.toUpperCase() ? 1 : -1;
        }
      }
    });

    let paginatedMovies = paginate(filterMovies, currentPage, pageSize);
    return { totalCount: filterMovies.length, data: paginatedMovies };
  };

  const { totalCount, data } = getPageData();

  return (
    <div className="row py-2">
      <div className="col-2">
        <ListGroup
          genres={genres}
          onGenreSelect={handleGenreSelection}
          selectedGenre={selectedGenre}
        />
      </div>
      <div className="col">
        {totalCount > 0 ? (
          <p>
            Showing
            {totalCount > 1
              ? " " + totalCount + " movies "
              : " " + totalCount + " movie "}
            in the Database
          </p>
        ) : (
          <p>There are no movies in the Database</p>
        )}
        {movies.length > 0 && (
          <MovieTable
            sortColumn={sortColumn}
            onSort={handleSort}
            movies={data}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        )}
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Movies;
