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
        aria-label="Log in"
      >
        Log In
      </button>

      <button
        className={css.btnRegistr}
        onClick={() => {
          setActiveModal("register");
          setIsMenuOpen(false);
        }}
        aria-label="Register"
      >
        Registration
      </button>

      {activeModal === "register" && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Registration Form"
          aria-labelledby="registration-form-title"
          aria-describedby="registration-form-description"
          className={css.modalContent}
          overlayClassName={css.modalOverlay}
        >
          <h2 id="registration-form-title" className={css.modalTitle}>
            Registration Form
          </h2>
          <p
            id="registration-form-description"
            className={css.modalDescription}
          >
            Please fill out the form below to register.
          </p>
          <RegistrationForm closeModal={closeModal} />
        </Modal>
      )}

      {activeModal === "login" && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Login Form"
          aria-labelledby="login-form-title"
          aria-describedby="login-form-description"
          className={css.modalContent}
          overlayClassName={css.modalOverlay}
        >
          <h2 id="login-form-title" className={css.modalTitle}>
            Login Form
          </h2>
          <p id="login-form-description" className={css.modalDescription}>
            Please enter your credentials to log in.
          </p>
          <LoginForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};
