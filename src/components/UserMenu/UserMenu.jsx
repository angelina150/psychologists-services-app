import { getAuth } from "firebase/auth";
import Logout from "../Logout/Logout.jsx";
import css from "./UserMenu.module.css";

const UserMenu = ({ setIsMenuOpen }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return (
      <>
        <div className={css.userMenuWrap}>
          <div className={css.nameWrap}>
            <div className={css.iconUserWrapper}>
              <svg className={css.iconUser} width="24" height="24">
                <use href="/icons/icons.svg#icon-user"></use>
              </svg>
            </div>
            <span className={css.name}>
              {user?.displayName
                ? user?.displayName
                : user?.email?.split("@")[0]}
            </span>
          </div>
          <Logout setIsMenuOpen={setIsMenuOpen} />
        </div>
      </>
    );
  } else {
    return <div>No user is logged in</div>;
  }
};

export default UserMenu;
