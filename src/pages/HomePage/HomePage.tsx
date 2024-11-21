import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import apiRequests from "../../utils/apiRequests";
import css from "./HomePage.module.css";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface ApiResponse {
  movies: Movie[];
}

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const { movies }: ApiResponse = await apiRequests("trending");
        setMovies(movies);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
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
