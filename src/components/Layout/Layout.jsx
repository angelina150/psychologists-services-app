import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthNav } from "../AuthNav/AuthNav.jsx";
import { Navigation } from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./Layout.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const auth = getAuth();
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

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Navigation isLoggedIn={isLoggedIn} />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>

      <Outlet />
    </div>
  );
};
