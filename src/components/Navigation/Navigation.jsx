import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className={isLoggedIn ? css.navWrapperLog : css.navWrapper}>
      <NavLink className={css.logoLink} to="/">
        <svg className={css.iconLogo} width="218" height="28">
          <use href="/icons/icons.svg#icon-logo"></use>
        </svg>
      </NavLink>

      <div className={css.navCenterWrapper}>
        <NavLink
          className={({ isActive }) => (isActive ? css.active : css.link)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? css.active : css.link)}
          to="/psychologists"
        >
          Psychologists
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? css.active : css.link)}
            to="/favorites"
          >
            Favorites
          </NavLink>
        )}
      </div>
    </nav>
  );
};
