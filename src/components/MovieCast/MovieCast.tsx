import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import { CastMember, ApiResponse } from "../../types/types";
import css from "./MovieCast.module.css";
import actor from "../../../public/img/actor.jpg";

const MovieCast = () => {
  const { id: movieId } = useParams();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const DEFAULT_IMAGE = actor;

  useEffect(() => {
    if (!movieId) {
      setError(new Error("Movie ID is required"));
      setLoading(false);
      return;
    }

    const fetchCast = async () => {
      try {
        const castData: ApiResponse | undefined = await apiRequests(
          "cast",
          1,
          movieId
        );

        if (castData && castData.cast) {
          setCast(castData.cast);
        } else {
          throw new Error("Invalid response format or no cast data");
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

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.movieCast}>
      <h2 className={css.castHeading}>Movie Cast</h2>
      <ul className={css.actorList}>
        {cast.map((actor) => (
          <li className={css.actor} key={actor.cast_id}>
            <img
              className={css.actorPhoto}
              src={
                actor.profile_path
                  ? `${BASE_IMAGE_URL}${actor.profile_path}`
                  : DEFAULT_IMAGE
              }
              alt={`${actor.name} Photo`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_IMAGE;
              }}
            />
            <p className={css.actorName}>
              {actor.name} as {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
