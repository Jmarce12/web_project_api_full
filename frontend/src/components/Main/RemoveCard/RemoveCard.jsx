export default function RemoveCard(props) {
  const { onClose, onCardDelete, card } = props;

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
    onClose();
  }

  return (
    <form
      className="popup__form"
      name="remove-card-form"
      id="remove-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="popup__text">
        ¿Estás seguro de que quieres eliminar esta tarjeta?
      </p>
      <button type="submit" className="popup__save-button">
        Sí
      </button>
    </form>
  );
}
