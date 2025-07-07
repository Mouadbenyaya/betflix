// api/tmdb.js - API corrigée pour films et séries
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    
    // Ajouter les paramètres par défaut
    const defaultParams = {
      api_key: API_KEY,
      language: 'fr-FR',
      ...params
    };
    
    Object.keys(defaultParams).forEach(key => {
      if (defaultParams[key] !== undefined) {
        url.searchParams.append(key, defaultParams[key]);
      }
    });

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// ==================== FILMS ====================

// Films populaires
export const fetchPopularMovies = async (page = 1) => {
  return await fetchFromAPI('/movie/popular', { page });
};

// Films les mieux notés
export const fetchTopRatedMovies = async (page = 1) => {
  return await fetchFromAPI('/movie/top_rated', { page });
};

// Films à venir
export const fetchUpcomingMovies = async (page = 1) => {
  return await fetchFromAPI('/movie/upcoming', { page });
};

// Films actuellement au cinéma
export const fetchNowPlayingMovies = async (page = 1) => {
  return await fetchFromAPI('/movie/now_playing', { page });
};

// Détails d'un film
export const fetchMovieDetails = async (movieId) => {
  return await fetchFromAPI(`/movie/${movieId}`, {
    append_to_response: 'videos,credits,similar,recommendations'
  });
};

// ==================== SÉRIES TV ====================

export const fetchPopularTvShows = async (page = 1) => {
  return await fetchFromAPI('/tv/popular', { page });
};

export const fetchTopRatedTvShows = async (page = 1) => {
  return await fetchFromAPI('/tv/top_rated', { page });
};

export const fetchTvShowsAiringToday = async (page = 1) => {
  return await fetchFromAPI('/tv/airing_today', { page });
};


export const fetchTvShowsOnTheAir = async (page = 1) => {
  return await fetchFromAPI('/tv/on_the_air', { page });
};


export const fetchTvShowDetails = async (tvId) => {
  return await fetchFromAPI(`/tv/${tvId}`, {
    append_to_response: 'videos,credits,similar,recommendations'
  });
};


export const fetchTrendingAll = async (timeWindow = 'day') => {
  return await fetchFromAPI(`/trending/all/${timeWindow}`);
};


export const fetchTrendingMovies = async (timeWindow = 'day') => {
  return await fetchFromAPI(`/trending/movie/${timeWindow}`);
};


export const fetchTrendingTvShows = async (timeWindow = 'day') => {
  return await fetchFromAPI(`/trending/tv/${timeWindow}`);
};


export const searchMulti = async (query, page = 1) => {
  return await fetchFromAPI('/search/multi', { query, page });
};

export const searchMovies = async (query, page = 1) => {
  return await fetchFromAPI('/search/movie', { query, page });
};

export const searchTvShows = async (query, page = 1) => {
  return await fetchFromAPI('/search/tv', { query, page });
};


export const fetchMovieGenres = async () => {
  return await fetchFromAPI('/genre/movie/list');
};

export const fetchTvGenres = async () => {
  return await fetchFromAPI('/genre/tv/list');
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  return await fetchFromAPI('/discover/movie', {
    with_genres: genreId,
    page,
    sort_by: 'popularity.desc'
  });
};

export const fetchTvShowsByGenre = async (genreId, page = 1) => {
  return await fetchFromAPI('/discover/tv', {
    with_genres: genreId,
    page,
    sort_by: 'popularity.desc'
  });
};


export const discoverMovies = async (filters = {}) => {
  const defaultFilters = {
    sort_by: 'popularity.desc',
    page: 1,
    'vote_count.gte': 50,
    ...filters
  };
  
  return await fetchFromAPI('/discover/movie', defaultFilters);
};

export const discoverTvShows = async (filters = {}) => {
  const defaultFilters = {
    sort_by: 'popularity.desc',
    page: 1,
    'vote_count.gte': 50,
    ...filters
  };
  
  return await fetchFromAPI('/discover/tv', defaultFilters);
};


export const fetchConfiguration = async () => {
  return await fetchFromAPI('/configuration');
};


export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getBackdropUrl = (path, size = 'w1280') => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'Durée inconnue';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

export const formatRating = (rating) => {
  if (!rating) return 'Non noté';
  return `${Math.round(rating * 10)}%`;
};

// Obtenir le nom du genre par ID
export const getGenreById = (genreId, genres) => {
  const genre = genres.find(g => g.id === genreId);
  return genre ? genre.name : 'Genre inconnu';
};

