import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
axios.defaults.baseURL = BASE_URL;

interface Movie {
  id: number;
  originalTitle: string;
  popularity: number;
  poster: string | null;
  dateOfRelease: string;
  title: string;
}

interface TrendingOrSearchResponse {
  movies: Movie[];
  totalPages: number;
  totalResult: number;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  budget: number;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  status: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
}

interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

type ApiResponse =
  | TrendingOrSearchResponse
  | MovieDetails
  | Review[]
  | CastMember[];

const apiRequests = async (
  endpoint: "trending" | "search" | "details" | "reviews" | "cast",
  page: number = 1,
  movieId: string = ""
): Promise<ApiResponse> => {
  let url: string;

  switch (endpoint) {
    case "trending":
      url = `/trending/movie/week?language=en-US`;
      break;
    case "search":
      url = `/search/movie?query=${movieId}&include_adult=false&language=en-US&page=${page}`;
      break;
    case "details":
      url = `/movie/${movieId}?language=en-US`;
      break;
    case "reviews":
      url = `/movie/${movieId}/reviews?language=en-US&page=${page}`;
      break;
    case "cast":
      url = `/movie/${movieId}/credits?language=en-US`;
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
      return response.data as MovieDetails;
    } else if (endpoint === "reviews") {
      return response.data.results as Review[];
    } else if (endpoint === "cast") {
      return response.data.cast as CastMember[];
    }
  } catch (error: any) {
    console.error("Error: " + error);
    throw error;
  }
};

export default apiRequests;
