import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import { MovieDetails } from "../../types/types";
import css from "./MovieDetailsPage.module.css";
import poster from "../../../public/img/poster.jpg";

function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const DEFAULT_POSTER_URL = poster;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await apiRequests("details", 1, id);
        if (movieData && movieData.movieDetails) {
          setMovie(movieData.movieDetails);
        } else {
          setError(new Error("Movie details not found"));
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(previousLocation.current);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className={css.movieDetailsPage}>
      <div className={css.movieDetails}>
        <div className={css.posterBox}>
          <button className={css.goBackBtn} onClick={handleGoBack}>
            Go back
          </button>
          <img
            className={css.poster}
            src={
              movie.poster_path
                ? `${BASE_IMAGE_URL}${movie.poster_path}`
                : DEFAULT_POSTER_URL
            }
            alt={`${movie.title} Poster`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_POSTER_URL;
            }}
          />
        </div>

        <div className={css.dataBox}>
          <h1 className={css.heading}>{movie.title}</h1>
          <p className={css.dataText}>
            Budget:{" "}
            {movie.budget > 0 ? ` ${movie.budget}$` : "Budget is not known"}
          </p>
          <p className={css.dataText}>Status: {movie.status}</p>
          <p className={css.dataText}>Rating: {movie.vote_average}</p>
          <p className={css.overview}>Overview: {movie.overview}</p>
        </div>
      </div>

      <nav className={css.linkBox}>
        <Link
          className={css.link}
          to="cast"
          state={{ from: previousLocation.current }}
        >
          Cast
        </Link>
        <Link
          className={css.link}
          to="reviews"
          state={{ from: previousLocation.current }}
        >
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
