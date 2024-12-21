import { Navigate, replace, Route, Routes } from "react-router-dom";
import Movies from "./compos/Movies";
import Navbar from "./compos/Navbar";
import Customers from "./compos/Customers";
import Rentals from "./compos/Rentals";
import NotFound from "./compos/common/NotFound";
import MovieForm from "./compos/MovieForm";
import LoginForm from "./compos/LoginForm";
import Register from "./compos/Register";
import { useEffect, useState } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = getMovies();
      setMovies(fetchedMovies);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      const fetchedGenres = getGenres();
      setGenres(fetchedGenres);
    }
    fetchGenres();
  }, []);

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

  const save = (data) => [setMovies(data)];

  return (
    <>
      <Navbar />
      <main className="container my-2">
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieForm movies={movies} genres={genres} onSave={save} />
            }
          />
          <Route path="/login" Component={LoginForm} />
          <Route path="/register" Component={Register} />
          <Route path="/customers" Component={Customers} />
          <Route path="/rentals" Component={Rentals} />
          <Route path="not-found" Component={NotFound} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
