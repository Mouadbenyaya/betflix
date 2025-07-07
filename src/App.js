import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] pointer-events-none" />
      <div className="relative flex min-h-screen">
        <aside className="relative z-10">{/* Sidebar si besoin */}</aside>
        <main className="flex-1 relative">
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                {/* Route par défaut / */}
                <Route path="/" element={<Home />} />
                {/* Route /betflix */}
                <Route path="/betflix" element={<Home />} />

                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv/:id" element={<TvDetails />} />

                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                      <div className="relative">
                        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                          404
                        </div>
                        <div className="absolute inset-0 text-8xl font-bold text-purple-400 opacity-20 blur-lg">
                          404
                        </div>
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">Page introuvable</h2>
                      <p className="text-gray-400 mb-8 max-w-md">
                        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                      </p>
                      <button
                        onClick={() => window.history.back()}
                        className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                          <svg
                            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Retour
                        </span>
                      </button>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="fixed bottom-4 right-4 w-2 h-16 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ height: "30%" }}
            />
          </div>
        </main>
      </div>

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
