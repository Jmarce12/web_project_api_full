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
      <button
        type="submit"
        className="popup__save-button popup__save-button_delete-card"
      >
        Sí
      </button>
    </form>
  );
}
