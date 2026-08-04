import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import { useTheme } from "./hooks/useTheme";
import { useHistory } from "./hooks/useHistory";
import { useFavorites } from "./hooks/useFavorites";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { history, addEntry, clearHistory, loading: historyLoading } = useHistory();
  const { favorites, addFavorite, removeFavorite, isFavorite, loading: favoritesLoading } = useFavorites();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onResult={addEntry}
                isFavorite={isFavorite}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/history"
            element={<History history={history} onClear={clearHistory} loading={historyLoading} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} onRemove={removeFavorite} loading={favoritesLoading} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
