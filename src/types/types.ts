export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  popularity: number;
  poster: string;
  dateOfRelease: string;
}

export interface Cast {
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

export interface MovieListProps {
  movies: Movie[];
}

export interface MovieDetailsProps {
  movieId: string;
  movie: Movie | null;
  error: Error | null;
  loading: boolean;
}

export interface NavLinkProps {
  isActive: boolean;
}
