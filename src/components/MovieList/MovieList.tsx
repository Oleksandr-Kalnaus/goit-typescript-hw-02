import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

interface Movie {
  id: number;
  title: string;
}

interface MovieListProps {
  movies?: Movie[];
}

function MovieList({ movies = [] }: MovieListProps) {
  const location = useLocation();

  return (
    <div className={css.movieListBox}>
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
