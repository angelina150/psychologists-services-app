import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Modal from "react-modal";
import css from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../Loader/Loader.jsx";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const auth = getAuth();

  const onSubmit = (data) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        toast.error("Error during login", error.message);
      })
      .finally(() => {
        setIsLoading(false);
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
      overlayClassName={css.modalBackdrop}
      className={css.modalContent}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={true}
      onRequestClose={closeModal}
    >
      {isLoading && <Loader />}
      <div className={css.containerLogin}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.desc}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
        <button className={css.closeBtn} type="button" onClick={closeModal}>
          <svg className={css.iconClose} width="32" height="32">
            <use href="/icons/icons.svg#icon-close"></use>
          </svg>
        </button>
        <form className={css.formLogIn} onSubmit={handleSubmit(onSubmit)}>
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
              type={showPassword.password ? "text" : "password"}
              className={css.input}
              {...register("password")}
              placeholder="Password"
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
            Log In
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginForm;
