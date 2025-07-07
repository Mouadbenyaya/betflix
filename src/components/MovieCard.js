import { Link } from "react-router-dom";
import { useState } from "react";
import { getImageUrl } from "../api/tmdb";
import "../styles/MovieCard.css";

export default function MovieCard({ movie, type }) {
  const [hovered, setHovered] = useState(false);

  const title = movie.title || movie.name;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : "N/A";

  const imgSrc = getImageUrl(movie.poster_path);

  return (
    <Link
      to={`/${type}/${movie.id}`}
      className={`movie-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      <img
        src={imgSrc || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={title}
        className="movie-poster"
        loading="lazy"
      />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-date">{releaseYear}</p>
      </div>
    </Link>
  );
}
