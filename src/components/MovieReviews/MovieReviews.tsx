import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequests from "../../utils/apiRequests";
import css from "./MovieReviews.module.css";

interface Review {
  id: string;
  author: string;
  content: string;
}

function MovieReviews() {
  const { id: movieId } = useParams<{ id: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await apiRequests("reviews", 1, movieId || "");
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.movieReviews}>
      <h2 className={css.movieHeading}>Movie Reviews</h2>
      {reviews.length ? (
        <ul className={css.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3 className={css.reviewAuthor}>
                <span className={css.title}>Author:</span> {review.author}
              </h3>
              <p className={css.reviewContent}>
                <span className={css.title}>Review:</span> {review.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No reviews available.</p>
      )}
    </div>
  );
}

export default MovieReviews;
