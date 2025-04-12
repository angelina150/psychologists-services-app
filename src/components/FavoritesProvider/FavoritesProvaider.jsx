import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        const savedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
      } else {
        setIsAuthenticated(false);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleFavorite = (psychologist) => {
    if (isAuthenticated) {
      let updatedFavorites = [...favorites];

      const isFavorite = updatedFavorites.some(
        (fav) => fav.name === psychologist.name
      );

      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter(
          (fav) => fav.name !== psychologist.name
        );
      } else {
        updatedFavorites.push(psychologist);
      }
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Saved favorites:", JSON.stringify(updatedFavorites));
    } else {
      alert("To use this feature, you need to log in!");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
