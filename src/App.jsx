import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { Layout } from "./components/Layout/Layout.jsx";
import { FavoritesProvider } from "./components/FavoritesProvider/FavoritesProvaider.jsx";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";
import PsychologistsPage from "./pages/PsychologistsPage/PsychologistsPage.jsx";
import Modal from "react-modal";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
