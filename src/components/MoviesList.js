import { useEffect, useState, useRef } from "react";
import {
  fetchPopularMovies,
  fetchMoviesByGenre,
  fetchPopularTvShows,
  fetchTvShowsByGenre,
} from "../api/tmdb";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";

export default function MovieList() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          popMovies,
          actMovies,
          sciMovies,
          animMovies,
          horMovies,
          comMovies,
          popTv,
          actTv,
          animTv,
          docuTv,
        ] = await Promise.all([
          fetchPopularMovies(),
          fetchMoviesByGenre(28),
          fetchMoviesByGenre(878),
          fetchMoviesByGenre(16),
          fetchMoviesByGenre(27),
          fetchMoviesByGenre(35),
          fetchPopularTvShows(),
          fetchTvShowsByGenre(10759),
          fetchTvShowsByGenre(16),
          fetchTvShowsByGenre(99),
        ]);

        setData({
          popMovies,
          actMovies,
          sciMovies,
          animMovies,
          horMovies,
          comMovies,
          popTv,
          actTv,
          animTv,
          docuTv,
        });
      } catch (err) {
        setError("Impossible de charger les films et séries. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [retryCount]);

  const handleRetry = () => setRetryCount((prev) => prev + 1);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Chargement en cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Oups ! Une erreur s'est produite</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={handleRetry}>Réessayer</button>
      </div>
    );
  }

  const sections = [
    { title: "Films Populaires", data: data.popMovies, type: "movie" },
    { title: "Films d'Action", data: data.actMovies, type: "movie" },
    { title: "Science-Fiction", data: data.sciMovies, type: "movie" },
    { title: "Films d'Animation", data: data.animMovies, type: "movie" },
    { title: "Films d'Horreur", data: data.horMovies, type: "movie" },
    { title: "Films de Comédie", data: data.comMovies, type: "movie" },
    { title: "Séries Populaires", data: data.popTv, type: "tv" },
    { title: "Séries d'Action", data: data.actTv, type: "tv" },
    { title: "Séries d'Animation", data: data.animTv, type: "tv" },
    { title: "Documentaires", data: data.docuTv, type: "tv" },
  ];

  return (
    <div className="movie-list-container">
      {sections.map((section, i) => (
        <MovieRow
          key={section.title}
          title={section.title}
          data={section.data}
          type={section.type}
          index={i}
        />
      ))}
    </div>
  );
}

function MovieRow({ title, data, type }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.9;
    scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="movie-row">
      <h2 className="row-title">{title}</h2>

      <div className="row-container">
        <button className="row-arrow left-arrow" onClick={() => scroll("left")} aria-label="Défiler à gauche">&#10094;</button>

        <div className="row-posters" ref={scrollRef}>
          {data.slice(0, 20).map((movie) => (
            <MovieCard key={movie.id} movie={movie} type={type} />
          ))}
        </div>

        <button className="row-arrow right-arrow" onClick={() => scroll("right")} aria-label="Défiler à droite">&#10095;</button>
      </div>
    </section>
  );
}
