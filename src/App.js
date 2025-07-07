import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import Sidebar from "./components/Sidebar"; // <-- Import Sidebar
import SearchComponent from "./components/SearchComponent"; 
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
      <div className="relative flex min-h-screen">
        <aside className="relative z-10">
          <Sidebar /> {/* <-- Ici on place le sidebar */}
        </aside>
        <main className="flex-1 relative">
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/betflix" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv/:id" element={<TvDetails />} />
                <Route path="/search" element={<SearchComponent />} /> {/* <-- NEW: Route for SearchComponent */}
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                      {/* 404 content */}
                      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
                      <p className="text-xl text-gray-300">Page non trouvée</p>
                      <p className="text-md text-gray-400 mt-2">Désolé, la page que vous recherchez n'existe pas.</p>
                      <a href="/" className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Retour à l'accueil</a>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>

          {/* Scroll Indicator (already existing) */}
          <div className="fixed bottom-4 right-4 w-2 h-16 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ height: "30%" }}
            />
          </div>
        </main>
      </div>

      {/* Loading overlay (already existing) */}
      <div
        className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500"
        id="loading-overlay"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-600 rounded-full animate-spin"
            style={{ animationDelay: "0.1s" }}
          />
        </div>
      </div>
    </div>
  );
}