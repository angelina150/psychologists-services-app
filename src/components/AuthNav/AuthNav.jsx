import Modal from "react-modal";
import { useState } from "react";
import css from "./AuthNav.module.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

export const AuthNav = ({ setIsMenuOpen }) => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className={css.wrapper}>
      <button
        className={css.btnLogin}
        onClick={() => {
          setActiveModal("login");
          setIsMenuOpen(false);
        }}
      >
        Log In
      </button>
      <button
        className={css.btnRegistr}
        onClick={() => {
          setActiveModal("register");
          setIsMenuOpen(false);
        }}
      >
        Registration
      </button>

      {activeModal === "register" && (
        <RegistrationForm closeModal={closeModal} />
      )}
      {activeModal === "login" && <LoginForm closeModal={closeModal} />}
    </div>
  );
};
