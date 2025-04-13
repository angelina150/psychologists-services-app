import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.jsx";
import { FavoritesProvider } from "./components/FavoritesProvider/FavoritesProvaider.jsx";

import Modal from "react-modal";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader.jsx";
import "./firebase";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);
const PsychologistsPage = lazy(() =>
  import("./pages/PsychologistsPage/PsychologistsPage.jsx")
);
function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <FavoritesProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/psychologists" element={<PsychologistsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </FavoritesProvider>
      </Suspense>
    </>
  );
}

export default App;
