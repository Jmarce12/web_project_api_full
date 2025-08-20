import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./Register/InfoTooltip.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import successfulRegister from "../images/successful-registered.png";
import errorRegister from "../images/error-register.png";

import { api } from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { setToken, getToken } from "../utils/token.js";

function App() {
  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  const navigate = useNavigate();
  const location = useLocation();

  // This effect listens to window resize events
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegistration = ({ email, password }) => {
    if (password) {
      auth
        .signUp(email, password)
        .then(() => {
          console.log("El proceso de registro ha sido exitoso");
          setRegisterMessage("¡Correcto! Ya estás registrado");
          setRegisterStatus(true);
        })
        .catch(() => {
          console.error();
          setRegisterMessage(
            "Uy, algo salió mal. Por favor, inténtalo de nuevo."
          );
          setRegisterStatus(false);
        });
    }
  };

  useEffect(() => {
    if (registerMessage.length > 0) {
      handleOpenPopup(registerStatusPopup);
    }
  }, [registerMessage]);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signIn(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          handleUserData();
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  const handleUserData = () => {
    auth
      .getUser(getToken())
      .then(({ data }) => {
        setUserData({ email: data.email });
        setCurrentUser((prev) => ({ ...prev, email: data.email }));
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    auth
      .getUser(token)
      .then(({ data: { email } }) => {
        setUserData({ email });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserData(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  async function handleUpdateAvatar(data) {
    await api
      .editAvatar(data)
      .then((newData) => {
        setCurrentUser((prev) => ({ ...prev, avatar: newData.avatar }));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .cardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(newCard) {
    await api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((error) => console.error(error));
  }

  const handleRegisterError = () => {
    if (registerMessage.includes("mal")) {
      return errorRegister;
    } else if (registerMessage.includes("Correcto")) {
      return successfulRegister;
    } else {
      return null;
    }
  };

  const main = (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Main
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        popup={popup}
        onUpdateAvatar={handleUpdateAvatar}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        onAddPlaceSubmit={handleAddPlaceSubmit}
        onHandleUserData={handleUserData}
        isLoggedIn={isLoggedIn}
      />
      <Footer />
    </ProtectedRoute>
  );

  const signin = (
    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
      <Login handleLogin={handleLogin} style={{ height: "100vh" }} />
    </ProtectedRoute>
  );

  const signup = (
    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
      <Register
        handleRegistration={handleRegistration}
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        popup={popup}
        isLoggedIn={isLoggedIn}
        registerMessage={registerMessage}
        setRegisterMessage={setRegisterMessage}
        registerStatus={registerStatus}
        style={{ height: "100vh" }}
      />
    </ProtectedRoute>
  );

  const registerStatusPopup = {
    children: (
      <InfoTooltip message={registerMessage} image={handleRegisterError()} />
    ),
  };

  const redirectPath = isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/signin" />
  );

  return (
    <>
      <div
        className="page"
        style={
          useLocation().pathname === "/"
            ? { height: "100%" }
            : { height: "100vh" }
        }
      >
        <CurrentUserContext.Provider
          value={{
            isLoggedIn,
            currentUser,
            userData,
            handleUpdateUser,
            windowSize,
            popup,
          }}
        >
          <Header setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={main} />
            <Route path="/signin" element={signin} />
            <Route path="/signup" element={signup} />
            <Route path="*" element={redirectPath} />
          </Routes>
        </CurrentUserContext.Provider>
        <template id="element-template">
          <div className="element">
            <img src="#" alt="#" className="element__photo" />
            <div className="element__content">
              <h2 className="element__title"></h2>
              <button className="element__like"></button>
            </div>
            <button className="element__delete"></button>
          </div>
        </template>
      </div>
    </>
  );
}

export default App;
