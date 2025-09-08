import { useState, useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name: name, about: description }); // Actualiza la información del usuario
  };

  return (
    <form
      className="popup__form"
      name="edit-profile"
      id="edit-profile"
      noValidate
      onSubmit={handleSubmit} // Agrega el controlador onSubmit
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          placeholder="Nombre"
          id="profile-name"
          name="profile-name"
          minLength="2"
          maxLength="40"
          required
          value={name} // Vincula name con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__input-error" id="profile-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          placeholder="Acerca de mí"
          id="profesion"
          name="profesion"
          minLength="2"
          maxLength="200"
          required
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__input-error" id="profesion-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
