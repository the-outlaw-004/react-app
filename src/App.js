import { Navigate, Route, Routes } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import {
  deleteMovie,
  getMovies,
  saveMovie,
  updateMovie,
} from "./services/movieService";
import { getGenres } from "./services/genreService";
import auth from "./services/authService";
import ProtectedRoute from "./compos/common/ProtectedRoute";

logService.init();
const movieEndpoint = process.env.REACT_APP_API_BASE_URL + "movies/";
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const decoded = auth.getCurrentUser();
    setUser(decoded);
  }, []);

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
        toast.error(`Movie with ${id} not found`);
      }
      if (ex.response && ex.response.status === 401) {
        toast.error("You should be logged in for delete action");
      }
      if (ex.response && ex.response.status === 403) {
        toast.error(ex.response.data);
      }
      setMovies(originalMovies);
    }
  };

  const handleLike = async (id) => {
    const movie = movies?.find((m) => m._id === id);
    const originalMovie = { ...movie };
    movie.isLiked = !movie.isLiked;
    movie.genreId = movie.genre._id;
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
      if (ex.response && ex.response.status === 401) {
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
        await saveMovie(data);
        navigate("/");
      } catch (ex) {
        console.log(ex);
        const expectedErrors =
          ex.response && ex.response.status >= 400 && ex.response.status < 500;
        if (expectedErrors) toast.error(ex.response.data);
        setMovies(originalMovies);
      }
    } else {
      data = {
        ...data,
        genreId: data.genre,
        genre: genres.find((g) => g._id === data.genre),
      };
      setMovies(movies.map((m) => (m._id === data._id ? data : m)));
      navigate("/");
      try {
        await updateMovie(data);
      } catch (ex) {
        console.log(ex);
        const expectedErrors =
          ex.response && ex.response.status >= 400 && ex.response.status < 500;
        if (expectedErrors) toast.error(ex.response.data);
        setMovies(originalMovies);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar user={user} setUser={setUser} />
      <main className="container my-2">
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                user={user}
                genres={genres}
                onDelete={handleDelete}
                onLike={handleLike}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieForm movies={movies} genres={genres} onSave={save} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
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
