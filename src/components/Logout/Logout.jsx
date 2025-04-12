import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import css from "./Logout.module.css";
const LogoutButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      if (location.pathname === "/favorites") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button className={css.btn} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
