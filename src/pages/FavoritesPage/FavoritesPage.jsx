import React, { useContext, useEffect, useState } from "react";
import FavoritesContext from "../../components/FavoritesProvider/FavoritesProvaider.jsx";
import PsychologistsItem from "../../components/PsychologistsItem/PsychologistsItem.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./FavoritesPage.module.css";
const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [favorites]);

  const handleRemoveFavorite = (favorite) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.name !== favorite.name
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {favorites.length > 0 && <Filters />}
      {favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <div key={favorite.name + index}>
            <PsychologistsItem psychologist={favorite} index={index} />
          </div>
        ))
      ) : (
        <p className={css.desc}>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
