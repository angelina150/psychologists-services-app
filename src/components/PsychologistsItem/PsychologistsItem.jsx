import React, { useContext, useState } from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";
import FavoritesContext from "../FavoritesProvider/FavoritesProvaider.jsx";
import css from "./PsychologistsItem.module.css";
import Review from "../Review/Review.jsx";
const PsychologistsItem = ({ psychologist, index }) => {
  const [activeName, setActiveName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const handleAddFavorite = (psychologist) => {
    toggleFavorite(psychologist);
  };
  const handleReadMore = (name) => {
    setActiveName(activeName === name ? null : name);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={css.psychologistCard}>
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src={psychologist.avatar_url}
          alt={psychologist.name}
        />
        <svg className={css.iconOnline} width="14" height="14">
          <use href="/icons/icons.svg#icon-online"></use>
        </svg>
      </div>
      <div className={css.infoBlock}>
        <div className={css.titleBlock}>
          <div className={css.infoRightWrap}>
            <p className={css.title}>Psychologist</p>
            <h2 className={css.name}>{psychologist.name}</h2>
          </div>
          <div className={css.infoLeftWrap}>
            <div className={css.iconStarWrapper}>
              <svg className={css.iconStar} width="16" height="16">
                <use href="/icons/icons.svg#icon-star"></use>
              </svg>
            </div>
            <p className={css.infoLeft}>
              <span className={css.infoLeftName}>Rating: </span>
              {psychologist.rating}
            </p>
            <p className={css.infoLeftName}>
              Price / 1 hour:
              <span className={css.infoPrice}>
                {" "}
                {psychologist.price_per_hour}$
              </span>
            </p>
          </div>
        </div>
        <div className={css.infoWrapper}>
          <p className={css.info}>
            <span className={css.infoName}>Experience:</span>{" "}
            {psychologist.experience}
          </p>
          <p className={css.info}>
            <span className={css.infoName}>License:</span>{" "}
            {psychologist.license}
          </p>
          <p className={css.info}>
            <span className={css.infoName}>Specialization:</span>{" "}
            {psychologist.specialization}
          </p>

          <p className={css.info}>
            <span className={css.infoName}>Initial_consultation:</span>{" "}
            {psychologist.initial_consultation}
          </p>
        </div>
        <p className={css.desc}>{psychologist.about}</p>

        <button
          className={css.btnFavorite}
          onClick={() => handleAddFavorite(psychologist)}
        >
          {favorites.some((fav) => fav.name === psychologist.name) ? (
            <svg className={css.iconActive} width="26" height="26">
              <use href="/icons/icons.svg#icon-heart-active"></use>
            </svg>
          ) : (
            <svg className={css.icon} width="26" height="26">
              <use href="/icons/icons.svg#icon-heart"></use>
            </svg>
          )}
        </button>

        {activeName !== psychologist.name && (
          <button
            type="button"
            className={css.btnReadMore}
            onClick={() => handleReadMore(psychologist.name)}
          >
            Read More
          </button>
        )}
        {activeName === psychologist.name && (
          <div className={css.reviews}>
            <Review reviews={psychologist.reviews} />
            <button
              className={css.btnAppointment}
              type="button"
              onClick={handleOpenModal}
            >
              Make an appointment
            </button>
          </div>
        )}
        {isModalOpen && (
          <AppointmentForm
            onClose={handleModalClose}
            psychologist={psychologist}
          />
        )}
      </div>
    </div>
  );
};

export default PsychologistsItem;
