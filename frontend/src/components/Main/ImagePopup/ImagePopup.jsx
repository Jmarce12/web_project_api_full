export default function ImagePopup(props) {
  const { card } = props;
  return (
    <>
      <img src={card.link} alt={card.name} className="popup__image-photo" />
      <h3 className="popup__image-title">{card.name}</h3>
    </>
  );
}
