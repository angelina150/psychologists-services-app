import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import css from "./Logout.module.css";
import { toast } from "react-toastify";
const LogoutButton = ({ setIsMenuOpen }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (location.pathname === "/favorites") {
        navigate("/");
      }
      setIsMenuOpen(false);
    } catch (error) {
      toast.error("Error logging out:", error);
    }
  };

  return (
    <button className={css.btn} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
