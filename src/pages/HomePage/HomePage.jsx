import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import apiRequests from "../../utils/apiRequests";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const { movies } = await apiRequests("trending");
        setMovies(movies);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.homePageBox}>
      <h1 className={css.heading}>Popular movies this week</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
