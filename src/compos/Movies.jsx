import React, { useState } from "react";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MovieTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBox";

const Movies = ({ movies, user, genres, onDelete, onLike }) => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortColumn, setSortColumn] = useState({
    orderBy: "title",
    order: "asc",
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSort = (object) => {
    setSortColumn(object);
  };

  const getPageData = () => {
    let filterMovies = movies;
    if (searchQuery)
      filterMovies = movies?.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (selectedGenre !== "all") {
      filterMovies = filterMovies?.filter(
        (movie) => movie.genre.name === selectedGenre.name
      );
    }

    filterMovies?.sort((a, b) => {
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

    let paginatedMovies =
      filterMovies && paginate(filterMovies, currentPage, pageSize);
    return { totalCount: filterMovies?.length, data: paginatedMovies };
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre("all");
    setCurrentPage(1);
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
        {/* <button className="btn btn-primary mb-2">New Movie</button> */}
        {user && (
          <Link to="/movie/new" className="btn btn-primary mb-2">
            New Movie
          </Link>
        )}
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
        <SearchBox value={searchQuery} onChange={handleSearch} />
        {movies?.length > 0 && (
          <MovieTable
            sortColumn={sortColumn}
            onSort={handleSort}
            movies={data}
            onLike={onLike}
            onDelete={onDelete}
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
