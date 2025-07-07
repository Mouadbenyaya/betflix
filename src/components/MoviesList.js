// src/components/MovieList.js

import { useEffect, useState, useRef } from "react";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies, // Re-adding for a new list
  fetchMoviesByGenre,
  fetchPopularTvShows,
  fetchTopRatedTvShows, // Re-adding for a new list
  fetchTvShowsAiringToday, // Re-adding for a new list
  fetchTvShowsByGenre,
} from "../api/tmdb"; // Ensure all necessary fetch functions are imported
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
          trendingMovies,
          upcomingMovies,
          popularMovies,
          topRatedMovies, // New data variable
          actionMovies,
          sciFiMovies,
          animationMovies,
          popularTvShows,
          topRatedTvShows, // New data variable
          airingTodayTvShows, // New data variable
          animationTvShows,
          documentaryTvShows,
        ] = await Promise.all([
          fetchTrendingMovies(),
          fetchUpcomingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(), // Fetch Top Rated Movies
          fetchMoviesByGenre(28), // Action Movies
          fetchMoviesByGenre(878), // Science Fiction Movies
          fetchMoviesByGenre(16), // Animation Movies (Movies)
          fetchPopularTvShows(),
          fetchTopRatedTvShows(), // Fetch Top Rated TV Shows
          fetchTvShowsAiringToday(), // Fetch TV Shows Airing Today
          fetchTvShowsByGenre(16), // Animation TV Shows
          fetchTvShowsByGenre(99), // Documentary TV Shows
        ]);

        setData({
          trendingMovies,
          upcomingMovies,
          popularMovies,
          topRatedMovies,
          actionMovies,
          sciFiMovies,
          animationMovies,
          popularTvShows,
          topRatedTvShows,
          airingTodayTvShows,
          animationTvShows,
          documentaryTvShows,
        });
      } catch (err) {
        setError("Impossible de charger les données. Veuillez réessayer.");
        console.error("Error loading data:", err);
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
    { title: "Films Tendances", data: data.trendingMovies, type: "movie" },
    { title: "Films Populaires", data: data.popularMovies, type: "movie" },
    { title: "Films à Venir", data: data.upcomingMovies, type: "movie" },
    { title: "Films les Mieux Notés", data: data.topRatedMovies, type: "movie" }, // New Section
    { title: "Films d'Action", data: data.actionMovies, type: "movie" },
    { title: "Films de Science-Fiction", data: data.sciFiMovies, type: "movie" },
    { title: "Films d'Animation", data: data.animationMovies, type: "movie" },

    { title: "Séries Populaires", data: data.popularTvShows, type: "tv" },
    { title: "Séries les Mieux Notées", data: data.topRatedTvShows, type: "tv" }, // New Section
    { title: "Séries en diffusion aujourd'hui", data: data.airingTodayTvShows, type: "tv" }, // New Section
    { title: "Séries d'Animation", data: data.animationTvShows, type: "tv" },
    { title: "Séries Documentaires", data: data.documentaryTvShows, type: "tv" },
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
          {data.slice(0, 20).map((item) => (
            <MovieCard key={item.id} movie={item} type={type} />
          ))}
        </div>

        <button className="row-arrow right-arrow" onClick={() => scroll("right")} aria-label="Défiler à droite">&#10095;</button>
      </div>
    </section>
  );
}