import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
axios.defaults.baseURL = BASE_URL;

const apiRequests = async (endpoint, page = 1, movieId = "") => {
  let url;

  if (endpoint === "trending") {
    url = `/trending/movie/week?language=en-US`;
  } else if (endpoint === "search") {
    url = `/search/movie?query=${movieId}&include_adult=false&language=en-US&page=${page}`;
  } else if (endpoint === "details") {
    url = `/movie/${movieId}?language=en-US`;
  } else if (endpoint === "reviews") {
    url = `/movie/${movieId}/reviews?language=en-US&page=${page}`;
  } else if (endpoint === "cast") {
    url = `/movie/${movieId}/credits?language=en-US`;
  } else {
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
      const movies = response.data.results.map((movie) => ({
        id: movie.id,
        originalTitle: movie.original_title || "No title",
        popularity: movie.popularity,
        poster: movie.backdrop_path,
        dateOfRelease: movie.release_date,
        title: movie.title,
      }));
      const totalPages = response.data.total_pages;
      const totalResult = response.data.total_results;
      return { movies, totalPages, totalResult };
    } else if (endpoint === "details") {
      return response.data;
    } else if (endpoint === "reviews") {
      return response.data.results;
    } else if (endpoint === "cast") {
      return response.data.cast;
    }
  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
};

export default apiRequests;
