import React, { useState, useEffect } from 'react';
import { searchTvShows, getImageUrl } from '../api/tmdb'; // Ensure getImageUrl is imported
import MovieCard from '../components/MovieCard';
import '../styles/Sections.css';

export default function Sections() {
  const [allSeries, setAllSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerBackgroundImage, setHeaderBackgroundImage] = useState(''); // State for the background image

  const seriesQueries = [
    { key: 'series1883', query: '1883' },
    { key: 'series1923', query: '1923' },
    { key: 'yellowstone', query: 'Yellowstone' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const combinedResults = [];
        let eighteenEightyThreeBackdrop = '';

        for (const series of seriesQueries) {
          const data = await searchTvShows(series.query);
          const firstResult = data.slice(0, 1)[0]; // Get the first result as an object

          if (firstResult) {
            combinedResults.push(firstResult);

            // Check if this is the '1883' series and get its backdrop
            if (series.key === 'series1883' && firstResult.backdrop_path) {
              // Using 'original' for a high-quality background image
              eighteenEightyThreeBackdrop = getImageUrl(firstResult.backdrop_path, 'original');
            }
          }
        }
        
        // Filter out duplicates if any (less likely with slice(0,1) and distinct queries)
        const uniqueSeries = Array.from(new Map(combinedResults.map(item => [item['id'], item])).values());
        
        setAllSeries(uniqueSeries);
        if (eighteenEightyThreeBackdrop) {
          setHeaderBackgroundImage(eighteenEightyThreeBackdrop);
        }

      } catch (error) {
        console.error('Erreur lors du chargement des séries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Inline style for the header background
  const headerStyle = headerBackgroundImage ? {
    backgroundImage: `linear-gradient(to top, rgba(20, 20, 20, 1) 0%, rgba(20, 20, 20, 0.5) 50%, rgba(20, 20, 20, 0.7) 100%), url(${headerBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <div className="sections-container">
      <header className="main-header" style={headerStyle}> {/* Apply the dynamic style here */}
        <div className="container">
          <h1 className="main-title">Collection Yellowstone Universe</h1>
          <p className="main-subtitle">Explorez les séries qui ont défini un univers emblématique.</p>
        </div>
      </header>

      <section className="main-series-section">
        <div className="container">
          <h2 className="section-title">Découvrez les séries principales</h2>
          {loading ? (
            <div className="series-grid">
              {/* Show 3 skeletons since we're fetching 3 main series */}
              {[...Array(seriesQueries.length)].map((_, index) => (
                <div key={index} className="series-card-skeleton"></div>
              ))}
            </div>
          ) : (
            <div className="series-grid">
              {allSeries.map((show) => (
                <MovieCard key={show.id} movie={show} type="tv" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}