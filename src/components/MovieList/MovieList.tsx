import { Link, useLocation } from "react-router-dom";
import { Movie, MovieListProps } from "../../types/types";
import css from "./MovieList.module.css";

function MovieList({ movies }: MovieListProps) {
  const location = useLocation();

  return (
    <div className={css.movieListBox}>
      <ul className={css.movieList}>
        {movies.map((movie: Movie) => (
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
