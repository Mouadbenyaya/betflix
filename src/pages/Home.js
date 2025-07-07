import { useEffect, useState } from "react";
import { fetchTrendingMovies, getBackdropUrl } from "../api/tmdb"; 
import MovieList from "../components/MoviesList"; 
import "../styles/Home.css"; // Link to the Home CSS file for styling

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]); // Stores the list of (up to 5) trending movies
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0); // Tracks the index of the current hero movie
  const [heroMovie, setHeroMovie] = useState(null); // The movie object currently displayed in the hero section

  // Effect to fetch trending movies data when the component mounts
  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrendingMovies();
        if (trending.length > 0) {
          // --- IMPORTANT: Take only the first 5 movies for the hero section ---
          const top5Trending = trending.slice(0, 5); 
          
          setTrendingMovies(top5Trending); // Store only these top 5
          setHeroMovie(top5Trending[0]); // Set the first of these as the initial hero movie
        }
      } catch (error) {
        console.error("Erreur chargement trending films:", error);
        
      }
    };
    loadTrending();
  }, []); 

  useEffect(() => {
 
    if (trendingMovies.length > 1) { 
      const intervalId = setInterval(() => {
        setCurrentHeroIndex(prevIndex => 
          (prevIndex + 1) % trendingMovies.length 
        );
      }, 10000); 

      return () => clearInterval(intervalId);
    }
  }, [trendingMovies]); // This effect re-runs if the 'trendingMovies' list changes

  useEffect(() => {
    if (trendingMovies.length > 0 && currentHeroIndex < trendingMovies.length) {
      setHeroMovie(trendingMovies[currentHeroIndex]);
    }
  }, [currentHeroIndex, trendingMovies]); // Re-run when current index or the movie list changes

  if (!heroMovie) {
    return <div className="loading-message">Chargement des données de films...</div>;
  }

  return (
    <div className="home-page-container">
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${getBackdropUrl(heroMovie.backdrop_path)})`,
        }}
      >
        
        <div key={heroMovie.id} className="hero-banner-content">
          <h1>{heroMovie.title}</h1>
          <p>{heroMovie.overview}</p>
        </div>
      </div>
      
      <MovieList /> 
    </div>
  );
}