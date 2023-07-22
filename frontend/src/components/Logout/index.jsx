import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  //   const LOGOUT_TIME = 60000;
  const LOGOUT_TIME = 60 * 60 * 1000;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const resetLogoutTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(handleLogout, LOGOUT_TIME);
  };

  let timeoutId;

  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimer();
    };
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    resetLogoutTimer();

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
