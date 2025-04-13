import { useNavigate } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className={css.hero}>
      <div className={css.heroText}>
        <div>
          <h1 className={css.title}>
            The road to the <span className={css.title_parth}>depths</span> of
            the human soul
          </h1>
          <p className={css.descHome}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            className={css.btn}
            onClick={() => {
              navigate("/psychologists");
            }}
            aria-label="Go to psychologists list"
          >
            Get started
            <svg
              className={css.iconArrow}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href="/icons/icons.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.heroImgWrap}>
        <img
          className={css.heroImg}
          src="/img/hero-img.jpg"
          alt="A professional psychologist talking to a patient"
          loading="lazy"
        />
        <div className={css.wrapperQuantity}>
          <div className={css.quantityCheck}>
            <svg
              className={css.iconCheck}
              width="30"
              height="30"
              aria-hidden="true"
            >
              <use href="/icons/icons.svg#icon-home-check"></use>
            </svg>
          </div>
          <div className={css.quantityDescWrap}>
            <p className={css.quantityDesc}>Experienced psychologists</p>
            <p className={css.quantityNumber}>15,000</p>
          </div>
        </div>
        <div className={css.questionWrap} aria-label="Have a question?">
          <svg
            className={css.iconQuestion}
            width="10"
            height="17"
            aria-hidden="true"
          >
            <use href="/icons/icons.svg#icon-question"></use>
          </svg>
        </div>
        <div className={css.usersWrap} aria-label="Number of users">
          <svg
            className={css.iconUsers}
            width="33"
            height="24.8"
            aria-hidden="true"
          >
            <use href="/icons/icons.svg#icon-users"></use>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Home;
