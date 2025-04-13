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
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../Loader/Loader.jsx";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegistrationForm = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.name,
        })
          .then(() => {
            setIsLoading(false);
            closeModal();
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error("Error updating user profile", error);
          });
      })
      .catch((error) => {
        toast.error("Error during registration", error);
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
      {isLoading && <Loader />}
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
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
          <input
            className={css.input}
            {...register("name")}
            placeholder="Name"
          />
        </label>
        <label>
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
          <input
            className={css.input}
            {...register("email")}
            placeholder="Email"
          />
        </label>
        <label className={css.labelPassword}>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
          <input
            placeholder="Password"
            className={css.input}
            type={showPassword.password ? "text" : "password"}
            {...register("password")}
          />

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
