import Modal from "react-modal";
import { useState } from "react";
import css from "./AuthNav.module.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

export const AuthNav = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className={css.wrapper}>
      <button className={css.btnLogin} onClick={() => setActiveModal("login")}>
        Log In
      </button>
      <button
        className={css.btnRegistr}
        onClick={() => setActiveModal("register")}
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
