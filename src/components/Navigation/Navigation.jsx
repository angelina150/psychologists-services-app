import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeModal = () => setIsMenuOpen(false);
  return (
    <nav className={isLoggedIn ? css.navWrapperLog : css.navWrapper}>
      <NavLink className={css.logoLink} to="/">
        <svg className={css.iconLogo}>
          <use href="/icons/icons.svg#icon-logo"></use>
        </svg>
      </NavLink>

      <button className={css.burger} onClick={toggleMenu}>
        <svg className={css.icon} width="28" height="28">
          <use href="/icons/icons.svg#icon-menu"></use>
        </svg>
      </button>

      {isMenuOpen && <div className={css.backdrop} onClick={toggleMenu}></div>}

      <div
        className={isMenuOpen ? css.navCenterWrapperOpen : css.navCenterWrapper}
      >
        <button className={css.btnClose} onClick={closeModal}>
          <svg className={css.iconClose} width="32" height="32">
            <use href="/icons/icons.svg#icon-close"></use>
          </svg>
        </button>
        <NavLink
          to="/"
          onClick={closeModal}
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/psychologists"
          onClick={closeModal}
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Psychologists
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/favorites"
            onClick={closeModal}
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Favorites
          </NavLink>
        )}
      </div>
    </nav>
  );
};
