import logo from "../../images/logo.svg";
import closeButton from "../../images/Close Icon.png";
import menuButton from "../../images/menu.svg";

import { useNavigate, useLocation } from "react-router";
import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { removeToken } from "../../utils/token.js";

function Header({ setIsLoggedIn }) {
  const { userData, isLoggedIn, windowSize } = useContext(CurrentUserContext);

  const [openMenu, setOpenMenu] = useState(false);

  const activePath = useLocation().pathname;
  const navigate = useNavigate();

  const menuButtonSrc = openMenu ? closeButton : menuButton;

  const loggedInfoButtonText = isLoggedIn
    ? "Cerrar sesión"
    : activePath === "/signup"
    ? "Iniciar sesión"
    : "Regístrate";

  const hideMenuButton =
    windowSize.width > 768
      ? "header__menuButton-hidden"
      : !isLoggedIn
      ? "header__menuButton-hidden"
      : "header__menuButton";

  const rearrangeLogButton = !isLoggedIn
    ? { gridArea: "menubutton" }
    : { gridArea: "loginfo" };

  const logout = () => {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // If the user is not logged in, the menu should always be closed.
    if (!isLoggedIn) {
      setOpenMenu(false);
    }

    // If the window is resized to a desktop width, close the mobile menu.
    if (windowSize.width > 768) {
      setOpenMenu(false);
    }
  }, [isLoggedIn, windowSize.width]);

  return (
    <header className={`header ${openMenu ? "header__responsive" : ""}`}>
      <img src={logo} alt="Around the U.S logo" className="header__logo" />
      <button className={hideMenuButton} onClick={() => setOpenMenu(!openMenu)}>
        <img src={menuButtonSrc} className="header__menuButton-image"></img>
      </button>
      <div
        className={`header__loggedInInfo ${
          isLoggedIn && !openMenu ? "header__loggedInInfo-hidden" : ""
        }`}
        style={rearrangeLogButton}
      >
        <p
          className={`header__loggedInInfo_email ${
            !isLoggedIn ? "header__loggedInInfo_email-hidden" : ""
          }`}
        >
          {userData.email}
        </p>
        <button
          className={`header__loggedInInfo_button ${
            isLoggedIn ? "header__loggedInInfo_button-logout" : ""
          }`}
          type="button"
          onClick={
            isLoggedIn
              ? logout
              : () => navigate(activePath === "/signup" ? "/login" : "/signup")
          }
        >
          {loggedInfoButtonText}
        </button>
      </div>
    </header>
  );
}

export default Header;
