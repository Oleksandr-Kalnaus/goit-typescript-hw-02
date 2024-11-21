import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import apiRequests from "../../utils/apiRequests";
import { Movie } from "../../types/types";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await apiRequests("trending");
        if (response && response.movies) {
          setMovies(response.movies);
        } else {
          setError(new Error("No movies found"));
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
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
