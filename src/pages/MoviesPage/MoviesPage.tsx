import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster, toast } from "react-hot-toast";
import { FaFilm } from "react-icons/fa";
import apiRequests from "../../utils/apiRequests";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    try {
      const { movies } = await apiRequests("search", 1, query);
      setMovies(movies);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("You must enter text to search for movies");
      return;
    }
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className="moviespage">
      <div className={css.searchBox}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button className={css.button} type="submit">
            <FaFilm className={css.icon} />
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </form>
      </div>

      {query.length > 0 && movies.length === 0 && (
        <p className={css.noMovie}>No movies found.</p>
      )}

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
