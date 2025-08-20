export default function EditAvatar(props) {
  const avatarRef = props.ref;

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="Enlace a la imagen"
          id="avatar-link"
          name="avatar-link"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}
