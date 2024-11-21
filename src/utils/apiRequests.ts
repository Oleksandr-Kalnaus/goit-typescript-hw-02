import axios from "axios";
import {
  ApiResponse,
  CastMember,
  Movie,
  MovieDetails,
  Review,
} from "../types/types";

const apiRequests = async (
  endpoint: "trending" | "search" | "details" | "reviews" | "cast",
  page: number = 1,
  movieId: string = ""
): Promise<ApiResponse | undefined> => {
  let url: string;
  const BASE_URL = "https://api.themoviedb.org/3";

  switch (endpoint) {
    case "trending":
      url = `${BASE_URL}/trending/movie/week?language=en-US`;
      break;
    case "search":
      url = `${BASE_URL}/search/movie?query=${movieId}&include_adult=false&language=en-US&page=${page}`;
      break;
    case "details":
      url = `${BASE_URL}/movie/${movieId}?language=en-US`;
      break;
    case "reviews":
      url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=${page}`;
      break;
    case "cast":
      url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
      break;
    default:
      throw new Error("Unknown endpoint");
  }

  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDQ2ZWI1YjYyNTkxNzM5ZjIwZGU0MjY2OTk3OTU2NCIsIm5iZiI6MTcyOTE4OTY0Mi42NjE3MTksInN1YiI6IjY3MTE1NDc2YTJjZmUxMjVmYjk2MGExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-zGG2igUWzG6o9ozbbxQdADtUcSnfYv3We00TfEW_1w",
    },
  };

  try {
    const response = await axios.get(url, options);

    if (endpoint === "trending" || endpoint === "search") {
      const movies: Movie[] = response.data.results.map((movie: any) => ({
        id: movie.id,
        originalTitle: movie.original_title || "No title",
        popularity: movie.popularity,
        poster: movie.backdrop_path,
        dateOfRelease: movie.release_date,
        title: movie.title,
      }));
      const totalPages: number = response.data.total_pages;
      const totalResult: number = response.data.total_results;
      return { movies, totalPages, totalResult };
    } else if (endpoint === "details") {
      return { movieDetails: response.data as MovieDetails };
    } else if (endpoint === "reviews") {
      return { reviews: response.data.results as Review[] };
    } else if (endpoint === "cast") {
      return { cast: response.data.cast as CastMember[] };
    }
  } catch (error: any) {
    console.error("Error: " + error);
    throw error;
  }

  return undefined;
};

export default apiRequests;
