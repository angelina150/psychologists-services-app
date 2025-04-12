import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "react-modal";
import css from "./RegistrationForm.module.css";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegistrationForm = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.name,
        })
          .then(() => {
            console.log("User registered:", user);
            closeModal();
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <Modal
      style={{ content: {}, overlay: {} }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={true}
      onRequestClose={closeModal}
      overlayClassName={css.modalBackdrop}
      className={css.modalContent}
    >
      <button className={css.closeBtn} type="button" onClick={closeModal}>
        <svg className={css.iconClose} width="32" height="32">
          <use href="/icons/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.containerRegistr}></div>
      <h2 className={css.title}>Registration</h2>
      <p className={css.desc}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form className={css.formRegisrt} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            className={css.input}
            {...register("name")}
            placeholder="Name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label>
          <input
            className={css.input}
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className={css.labelPassword}>
          <input
            placeholder="Password"
            className={css.input}
            type={showPassword.password ? "text" : "password"}
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}

          <PasswordToggleButton
            isVisible={showPassword.password}
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          />
        </label>

        <button className={css.btnSubmit} type="submit">
          Sign Up
        </button>
      </form>
    </Modal>
  );
};

export default RegistrationForm;
