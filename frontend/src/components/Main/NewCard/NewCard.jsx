import { useRef } from "react";

export default function NewCard(props) {
  const cardName = useRef();
  const cardLink = useRef();
  const { onClose } = props;

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: cardName.current.value,
      link: cardLink.current.value,
    });
    onClose();
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input"
          placeholder="Título"
          id="card-name"
          name="card-name"
          minLength="2"
          maxLength="30"
          required
          ref={cardName}
        />
        <span className="popup__input-error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="Enlace a la imagen"
          id="card-link"
          name="card-link"
          required
          ref={cardLink}
        />
        <span className="popup__input-error" id="card-link-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
