// src/pages/MovieDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Import useRef
import { fetchMovieDetails, getBackdropUrl, getImageUrl } from "../api/tmdb";
import "../styles/MovieDetails.css"; // Import your custom CSS file
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Lucide icons for arrows

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const castListRef = useRef(null); // Create a ref for the cast list container

  useEffect(() => {
    // Note: ensure your fetchMovieDetails function also fetches 'credits' (casting)
    fetchMovieDetails(id)
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  // Function to scroll the cast list left
  const scrollLeft = () => {
    if (castListRef.current) {
      castListRef.current.scrollBy({
        left: -200, // Scroll left by 200px (adjust as needed)
        behavior: 'smooth' // Smooth scrolling animation
      });
    }
  };

  // Function to scroll the cast list right
  const scrollRight = () => {
    if (castListRef.current) {
      castListRef.current.scrollBy({
        left: 200, // Scroll right by 200px (adjust as needed)
        behavior: 'smooth' // Smooth scrolling animation
      });
    }
  };

  if (!movie) return <div className="loading-message">Chargement...</div>;

  return (
    <div className="movie-details-container">
      {/* Backdrop Image with Netflix-style overlay */}
      <div className="backdrop-wrapper">
        <img src={getBackdropUrl(movie.backdrop_path)} alt={movie.title} className="w-full movie-backdrop-img" />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="p-4 movie-details-content">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p>
        
        <h2 className="text-xl mt-4 mb-2 movie-casting-title">Casting</h2>
        
        {/* Cast List with Navigation Arrows */}
        <div className="cast-list-nav-container"> {/* New wrapper for arrows and list */}
          <button onClick={scrollLeft} className="scroll-arrow left-arrow" aria-label="Scroll left">
            <ChevronLeft size={32} /> {/* Lucide Left Arrow icon */}
          </button>

          <div 
            className="flex overflow-x-auto gap-2 movie-cast-list" 
            ref={castListRef} // Attach the ref here
          >
            {movie.credits && movie.credits.cast && movie.credits.cast.map((actor) => ( // Removed .slice(0, 10) to allow scrolling all cast
              <div key={actor.id} className="w-24 text-center movie-actor-card">
                <img
                  src={getImageUrl(actor.profile_path) || "https://via.placeholder.com/185x278?text=No+Image"}
                  alt={actor.name}
                  className="rounded movie-actor-img"
                />
                <div className="text-xs movie-actor-name">{actor.name}</div>
              </div>
            ))}
          </div>

          <button onClick={scrollRight} className="scroll-arrow right-arrow" aria-label="Scroll right">
            <ChevronRight size={32} /> {/* Lucide Right Arrow icon */}
          </button>
        </div>
      </div>
    </div>
  );
}