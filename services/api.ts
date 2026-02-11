export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string } = {}) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      console.error("Error while fetching movies", response.statusText);
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("Error while fetching movies", err);
    throw new Error((err as Error).message);
  }
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}&include_adult=false&language=en-US`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

     if (!response.ok) {
      console.error("Error while fetching movies details", response.statusText);
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;

  } catch (err) {
    console.error("Error while fetching movies details", err);
    throw new Error((err as Error).message);
  }
}