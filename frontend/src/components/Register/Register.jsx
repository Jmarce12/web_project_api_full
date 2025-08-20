import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";

import Popup from "../Main/Popup/Popup";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Register({
  handleRegistration,
  setRegisterMessage,
  registerStatus,
  onClosePopup,
}) {
  const { popup } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    registerStatus ? navigate("/login") : null;
    setRegisterMessage("");
    onClosePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="userform">
      <h2 className="userform__title">Regístrate</h2>
      <form className="userform__form" onSubmit={handleSubmit}>
        <div className="userform__input-container">
          <input
            id="email"
            name="email"
            type="email"
            className="userform__input"
            placeholder="Correo electrónico"
            required
            value={data.email}
            onChange={handleChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            className="userform__input"
            placeholder="Contraseña"
            required
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button className="userform__button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="userform__text">
        ¿Ya eres miembro?{" "}
        <NavLink className="userform__link" to="/login">
          Inicia sesión aquí
        </NavLink>
      </p>
      {popup && <Popup onClose={handleClose}>{popup.children}</Popup>}
    </div>
  );
}
