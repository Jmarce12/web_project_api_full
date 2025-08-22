import CurrentUserContext from "../../contexts/CurrentUserContext";
import ImagePopup from "../Main/ImagePopup/ImagePopup";
import { useContext } from "react";

export default function Card(props) {
  const { name, link, likes } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;
  const imageComponent = { children: <ImagePopup card={{ name, link }} /> };
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like__active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike(props.card);
    console.log("like clicked");
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
