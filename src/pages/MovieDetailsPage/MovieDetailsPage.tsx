import { useEffect, useState, useRef } from "react";
import {
  useParams,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import css from "./MovieDetailsPage.module.css";
import poster from "../../../public/img/poster.jpg";

interface RouteParams {
  id: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  budget: number;
  status: string;
  vote_average: number;
  overview: string;
}

interface ApiError extends Error {
  response?: {
    status: number;
    data: {
      status_message: string;
    };
  };
  request?: unknown;
}

function MovieDetailsPage() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const DEFAULT_POSTER_URL = poster;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData: Movie = await apiRequests("details", 1, id!);
        setMovie(movieData);
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError.response) {
          setError(
            new Error(
              `Error ${apiError.response.status}: ${apiError.response.data.status_message}`
            )
          );
        } else if (apiError.request) {
          setError(
            new Error("No response from the server. Please try again later.")
          );
        } else {
          setError(new Error(apiError.message));
        }
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (error) return <p>Error: {error.message}</p>;
  if (!movie) return <div>Loading...</div>;

  const handleGoBack = () => {
    navigate(previousLocation.current);
  };

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
            onError={(e) =>
              ((e.target as HTMLImageElement).src = DEFAULT_POSTER_URL)
            }
          />
        </div>

        <div className={css.dataBox}>
          <h1 className={css.heading}>{movie.title}</h1>
          <p className={css.dataText}>
            Budget:
            {movie.budget > 0 ? ` ${movie.budget}$` : " Budget is not known"}
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
