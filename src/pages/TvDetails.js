import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTvShowDetails, getBackdropUrl, getImageUrl } from "../api/tmdb";
import "../styles/TvDetails.css"; 

export default function TvDetails() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);

  useEffect(() => {
    fetchTvShowDetails(id).then(setTv).catch(console.error);
  }, [id]);

  if (!tv) return <div className="loading-message">Chargement...</div>; // Added class

  return (
    <div className="tv-details-container"> {/* Added class for main container */}
      {/* Backdrop Image with Netflix-style overlay */}
      <div className="backdrop-wrapper">
        <img src={getBackdropUrl(tv.backdrop_path)} alt={tv.name} className="w-full tv-backdrop-img" />
        <div className="backdrop-overlay"></div> {/* Overlay for better text readability */}
      </div>

      <div className="p-4 tv-details-content"> {/* Added class for content padding and layout */}
        <h1 className="text-3xl font-bold">{tv.name}</h1>
        <p className="tv-overview">{tv.overview}</p> {/* Added class for overview */}
        <h2 className="text-xl mt-4 mb-2 tv-casting-title">Casting</h2> {/* Added class for casting title */}
        <div className="flex overflow-x-auto gap-2 tv-cast-list"> {/* Added class for cast list */}
          {tv.credits && tv.credits.cast.slice(0, 10).map((actor) => (
            <div key={actor.id} className="w-24 text-center tv-actor-card"> {/* Added class for actor card */}
              <img
                src={getImageUrl(actor.profile_path) || "https://via.placeholder.com/185x278?text=No+Image"}
                alt={actor.name}
                className="rounded tv-actor-img" /* Added class for actor image */
              />
              <div className="text-xs tv-actor-name">{actor.name}</div> {/* Added class for actor name */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}