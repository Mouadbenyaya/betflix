import { useEffect, useState } from "react";
import { fetchTrendingMovies, getBackdropUrl } from "../api/tmdb";
import MovieList from "../components/MoviesList";
import "../styles/Home.css";

export default function Home() {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setHeroMovie(trending[0]); // Le premier film trending en hero
      } catch (error) {
        console.error("Erreur chargement trending:", error);
      }
    };
    loadTrending();
  }, []);

  return (
    <div className="home-page-container">
      {heroMovie && (
        <div
          className="hero-banner"
          style={{
            backgroundImage: `url(${getBackdropUrl(heroMovie.backdrop_path)})`,
          }}
        >
          <div className="hero-banner-content">
            <h1>{heroMovie.title}</h1>
            <p>{heroMovie.overview}</p>
          </div>
        </div>
      )}
      <MovieList />
    </div>
  );
}
