import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";
import TimePicker from "../TimePicker/TimePicker.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader.jsx";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().required("Comment is required"),
  time: yup.string().required("Time is required"),
});

const AppointmentForm = ({ onClose, psychologist }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      psychologistName: psychologist.name,
    };

    setTimeout(() => {
      toast.success("The data has been successfully submitted.");
      console.log(formData);
      setIsLoading(false);
      onClose();
    }, 1500);
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
      isOpen={true}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
    >
      {isLoading && <Loader />}
      <div className={css.wrapper}>
        <button
          className={css.closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close appointment form"
        >
          <svg className={css.iconClose} width="32" height="32">
            <use href="/icons/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={css.title} id="modalTitle">
          Make an appointment with a psychologist
        </h2>
        <p className={css.desc} id="modalDesc">
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={css.aboutPsychologist}>
          <img
            className={css.img}
            src={psychologist.avatar_url}
            alt={psychologist.name}
            aria-describedby="psychologistDesc"
          />
          <div className={css.aboutPsychologistDesc}>
            <p className={css.psychologistTitle}>Your psychologist</p>
            <h3 className={css.name}>{psychologist.name}</h3>
          </div>
        </div>
        <form
          className={css.form}
          onSubmit={handleSubmit(onSubmit)}
          aria-labelledby="formTitle"
        >
          <div>
            <label className={css.label}>
              {errors.name && (
                <span className={css.error}>{errors.name.message}</span>
              )}
              <input
                className={css.input}
                {...register("name")}
                placeholder="Name"
                aria-label="Enter your name"
              />
            </label>
          </div>

          <div className={css.shortInputWrap}>
            <label className={css.label}>
              {errors.phone && (
                <span className={css.error}>{errors.phone.message}</span>
              )}
              <input
                className={css.input}
                {...register("phone")}
                placeholder="+380"
                aria-label="Enter your phone number"
              />
            </label>
            <div className={css.time}>
              {errors.time && (
                <span className={css.error}>{errors.time.message}</span>
              )}
              <TimePicker setValue={setValue} />
            </div>
          </div>

          <div>
            <label className={css.label}>
              {errors.email && (
                <span className={css.error}>{errors.email.message}</span>
              )}
              <input
                className={css.input}
                {...register("email")}
                type="email"
                placeholder="Email"
                aria-label="Enter your email"
              />
            </label>
          </div>

          <div>
            <label className={css.label}>
              {errors.comment && (
                <span className={css.error}>{errors.comment.message}</span>
              )}
              <textarea
                className={css.comment}
                {...register("comment")}
                placeholder="Comment"
                aria-label="Add a comment"
              />
            </label>
          </div>

          <button
            className={css.btnSend}
            type="submit"
            aria-label="Submit appointment form"
          >
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentForm;
