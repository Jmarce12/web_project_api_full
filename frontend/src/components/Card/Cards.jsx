import ImagePopup from "../Main/ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;
  const imageComponent = { children: <ImagePopup card={{ name, link }} /> };
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like__active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    onCardDelete(props.card);
  };

  return (
    <li className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        aria-label="Delete card"
        className="card__delete"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
