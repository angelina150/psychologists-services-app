import css from "./Review.module.css";

const Review = ({ reviews }) => {
  return (
    <div className={css.wrapper}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div className={css.reviewsWrapper} key={index}>
            <div className={css.userInfoWrap}>
              <div className={css.initials}>
                {review.reviewer?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className={css.name}>{review.reviewer}</p>
                <div className={css.wrapperRating}>
                  <svg className={css.iconStar} width="16" height="16">
                    <use href="/icons/icons.svg#icon-star"></use>
                  </svg>
                  {review.rating}
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>Loading psychologists...</p>
      )}
    </div>
  );
};

export default Review;
