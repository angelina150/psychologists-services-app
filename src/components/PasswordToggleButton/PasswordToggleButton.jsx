import css from "./PasswordToggleButton.module.css";

const PasswordToggleButton = ({ isVisible, onClick }) => (
  <button className={css.btnShowPassword} type="button" onClick={onClick}>
    {isVisible ? (
      <svg className={css.iconEye} width="20" height="20">
        <use href="/icons/icons.svg#icon-eye"></use>
      </svg>
    ) : (
      <svg className={css.iconEye} width="20" height="20">
        <use href="/icons/icons.svg#icon-eye-off"></use>
      </svg>
    )}
  </button>
);
export default PasswordToggleButton;
