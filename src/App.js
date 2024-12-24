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
import httpService from "./services/httpService";
import { toast, ToastContainer } from "react-toastify";
import logService from "./services/logService";
import {
  deleteMovie,
  getMovies,
  saveMovie,
  updateMovie,
} from "./services/movieService";
import { getGenres } from "./services/genreService";

logService.init();
const movieEndpoint = process.env.REACT_APP_API_BASE_URL + "movies/";
function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      // const fetchedMovies = getMovies();
      // const result = await httpService.get(movieEndpoint);
      const result = await getMovies();
      setMovies(result?.data);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      // const fetchedGenres = getGenres();
      // const result = await httpService.get(
      //   process.env.REACT_APP_API_BASE_URL + "genres"
      // );
      const result = await getGenres();

      setGenres(result?.data);
    }
    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    const originalMovies = [...movies];
    setMovies(movies.filter((movie) => movie._id !== id));
    try {
      // await httpService.delete(movieEndpoint + id);
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log(`Movie with ${id} not found`);
      }
      setMovies(originalMovies);
    }
  };

  const handleLike = async (id) => {
    const movie = movies?.find((m) => m._id === id);
    const originalMovie = { ...movie };
    console.log("movie before", movie);
    movie.isLiked = !movie.isLiked;
    movie.genreId = movie.genre._id;
    console.log("movie after", movie);
    setMovies(
      movies.map((m) => {
        return m._id === id ? movie : m;
      })
    );

    try {
      await httpService.put(movieEndpoint + id, movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.message);
      }
      setMovies(movies.map((m) => (m._id === id ? originalMovie : m)));
    }
  };

  const save = async (data, id = null) => {
    const originalMovies = [...movies];
    if (id === "new") {
      data = {
        ...data,
        _id: String(Date.now()),
        genreId: data.genre,
        genre: genres.find((g) => g._id === data.genre),
      };
      setMovies([{ ...data }, ...movies]);
      try {
        const result = await saveMovie(data);
      } catch (ex) {
        console.log(ex);
        const expectedErrors =
          ex.response && ex.response.status >= 400 && ex.response.status < 500;
        if (expectedErrors) toast.error(ex.message);
        setMovies(originalMovies);
      }
    } else {
      data = {
        ...data,
        genreId: data.genre,
        genre: genres.find((g) => g._id === data.genre),
      };
      setMovies(movies.map((m) => (m._id === data._id ? data : m)));
      try {
        const result = await updateMovie(data);
      } catch (ex) {
        console.log(ex);
        const expectedErrors =
          ex.response && ex.response.status >= 400 && ex.response.status < 500;
        if (expectedErrors) toast.error(ex.message);
        setMovies(originalMovies);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="container my-2">
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                genres={genres}
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
