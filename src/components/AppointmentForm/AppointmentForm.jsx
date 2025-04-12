import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AppointmentForm.module.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";
import TimePicker from "../TimePicker/TimePicker.jsx";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().required("Comment is required"),
  time: yup.string().required("Time is required"),
});

const AppointmentForm = ({ onClose, psychologist }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      psychologistName: psychologist.name,
    };
    console.log(formData);
    onClose();
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
      isOpen={true}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <div className={css.wrapper}>
        <button className={css.closeBtn} type="button" onClick={onClose}>
          <svg className={css.iconClose} width="32" height="32">
            <use href="/icons/icons.svg#icon-close"></use>
          </svg>
        </button>
        <h2 className={css.title}>Make an appointment with a psychologist</h2>
        <p className={css.desc}>
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
          />
          <div className={css.aboutPsychologistDesc}>
            <p className={css.psychologistTitle}>Your psychologist</p>
            <h3 className={css.name}>{psychologist.name}</h3>
          </div>
        </div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={css.label}>
              <input
                className={css.input}
                {...register("name")}
                placeholder="Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
          </div>

          <div className={css.shortInputWrap}>
            <label className={css.label}>
              <input
                className={css.input}
                {...register("phone")}
                placeholder="+380"
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </label>
            <TimePicker setValue={setValue} />
          </div>

          <div>
            <label className={css.label}>
              <input
                className={css.input}
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </label>
          </div>

          <div>
            <label className={css.label}>
              <textarea
                className={css.comment}
                {...register("comment")}
                placeholder="Comment"
              />
              {errors.comment && <p>{errors.comment.message}</p>}
            </label>
          </div>

          <button className={css.btnSend} type="submit">
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentForm;
