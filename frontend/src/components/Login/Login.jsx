import { useState } from "react";
import { NavLink } from "react-router";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="userform">
      <h2 className="userform__title">Inicia sesión</h2>
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
          Inicia sesión
        </button>
      </form>
      <p className="userform__text">
        ¿Aún no eres un miembro?{" "}
        <NavLink className="userform__link" to="/signup">
          Regístrate aquí
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
