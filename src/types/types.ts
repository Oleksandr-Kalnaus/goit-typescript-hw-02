export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

export interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  budget: number;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  status: string;
}

export interface ApiResponse {
  movies?: Movie[];
  cast?: CastMember[];
  reviews?: Review[];
  totalPages?: number;
  totalResult?: number;
  movieDetails?: MovieDetails;
}

export interface MovieListProps {
  movies: Movie[];
}
