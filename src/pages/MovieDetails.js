import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails, getBackdropUrl, getImageUrl } from "../api/tmdb";
import "../styles/MovieDetails.css"; // Import your custom CSS file

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie).catch(console.error);
  }, [id]);

  if (!movie) return <div className="loading-message">Chargement...</div>; // Added class

  return (
    <div className="movie-details-container"> {/* Added class for main container */}
      {/* Backdrop Image with Netflix-style overlay */}
      <div className="backdrop-wrapper">
        <img src={getBackdropUrl(movie.backdrop_path)} alt={movie.title} className="w-full movie-backdrop-img" />
        <div className="backdrop-overlay"></div> {/* Overlay for better text readability */}
      </div>

      <div className="p-4 movie-details-content"> {/* Added class for content padding and layout */}
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p> {/* Added class for overview */}
        <h2 className="text-xl mt-4 mb-2 movie-casting-title">Casting</h2> {/* Added class for casting title */}
        <div className="flex overflow-x-auto gap-2 movie-cast-list"> {/* Added class for cast list */}
          {movie.credits && movie.credits.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="w-24 text-center movie-actor-card"> {/* Added class for actor card */}
              <img
                src={getImageUrl(actor.profile_path) || "https://via.placeholder.com/185x278?text=No+Image"}
                alt={actor.name}
                className="rounded movie-actor-img" /* Added class for actor image */
              />
              <div className="text-xs movie-actor-name">{actor.name}</div> {/* Added class for actor name */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}