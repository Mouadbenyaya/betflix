import React, { useState, useEffect, useRef } from 'react';
import { searchMulti, fetchTopRatedMovies, fetchPopularTvShows } from '../api/tmdb';
import MovieCard from './MovieCard';
import '../styles/SearchComponent.css';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const loadDefaultContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies = await fetchTopRatedMovies();
        const tvShows = await fetchPopularTvShows();

        // Ajouter manuellement media_type à chaque item
        const moviesWithType = movies.map(movie => ({ ...movie, media_type: 'movie' }));
        const tvWithType = tvShows.map(tv => ({ ...tv, media_type: 'tv' }));

        const combined = [...moviesWithType, ...tvWithType];

        // Optionnel : trier par popularité décroissante
        combined.sort((a, b) => b.popularity - a.popularity);

        setResults(combined);
      } catch (err) {
        console.error("Erreur chargement contenu par défaut:", err);
        setError("Impossible de charger les films et séries populaires.");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() === '') {
      loadDefaultContent();
    }
  }, [query]);

  useEffect(() => {
    if (query.trim() === '') return;

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMulti(query);
        setResults(data);
      } catch (err) {
        console.error("Erreur recherche:", err);
        setError("Impossible de charger les résultats. Réessayez.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher films, séries, acteurs..."
        aria-label="Zone de recherche"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="search-feedback" aria-live="polite">
        {loading && (
          <div className="search-loading">
            <span className="loader" /> Chargement...
          </div>
        )}
        {error && <div className="search-error">{error}</div>}
        {!loading && !error && query.trim() !== '' && results.length === 0 && (
          <div className="search-noresults">Aucun résultat pour « {query} »</div>
        )}
      </div>

      <div className="search-results-grid">
        {results
          .filter(item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path)
          .map(item => (
            <MovieCard
              key={`${item.media_type}-${item.id}`}
              movie={item}
              type={item.media_type}
            />
          ))}
      </div>
    </div>
  );
}
