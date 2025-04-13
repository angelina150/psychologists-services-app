import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthNav } from "../AuthNav/AuthNav.jsx";
import { Navigation } from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./Layout.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const auth = getAuth();
  const closeModal = () => setIsMenuOpen(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    if (isHomePage) {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
    return () => document.body.classList.remove("home-page");
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Navigation isLoggedIn={isLoggedIn} />
        <button className={css.burger} onClick={toggleMenu}>
          <svg className={css.icon} width="28" height="28">
            <use href="/public/icons/icons.svg#icon-user"></use>
          </svg>
        </button>
        {isMenuOpen && (
          <div className={css.backdrop} onClick={toggleMenu}></div>
        )}
        <div
          className={`${css.menuWrap} ${isMenuOpen ? css.menuMobileOpen : ""}`}
        >
          <button className={css.btnClose} onClick={closeModal}>
            <svg className={css.iconClose} width="32" height="32">
              <use href="/icons/icons.svg#icon-close"></use>
            </svg>
          </button>

          {isLoggedIn ? (
            <UserMenu setIsMenuOpen={setIsMenuOpen} />
          ) : (
            <AuthNav setIsMenuOpen={setIsMenuOpen} />
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};
