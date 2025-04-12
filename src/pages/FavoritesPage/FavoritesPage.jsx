import React, { useContext } from "react";
import FavoritesContext from "../../components/FavoritesProvider/FavoritesProvaider.jsx";
import PsychologistsItem from "../../components/PsychologistsItem/PsychologistsItem.jsx";
import Filters from "../../components/Filters/Filters.jsx";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  const handleRemoveFavorite = (favorite) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.name !== favorite.name
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Filters />
      {favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <div key={favorite.name + index} className="favorite-card">
            <PsychologistsItem psychologist={favorite} index={index} />
          </div>
        ))
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
