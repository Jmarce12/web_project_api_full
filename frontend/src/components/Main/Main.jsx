import { useContext, useRef } from "react";

import Popup from "./Popup/Popup";
import NewCard from "./NewCard/NewCard";
import EditProfile from "./EditProfile/EditProfile";
import EditAvatar from "./Avatar/EditAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Card from "../Card/Cards";

export default function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const avatar = useRef();
  const { onOpenPopup, onClosePopup, onCardDelete, onCardLike } = props;

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        onAddPlaceSubmit={props.onAddPlaceSubmit}
        onClose={onClosePopup}
      />
    ),
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar ref={avatar} onUpdateAvatar={props.onUpdateAvatar} />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__photo-container"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Foto de perfil"
            className="profile__photo"
          />
          <div className="profile__photo-edit"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>
      <ul className="cards__list">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
      {props.popup && (
        <Popup
          onClose={onClosePopup}
          title={props.popup.title}
          isLoggedIn={props.isLoggedIn}
        >
          {props.popup.children}
        </Popup>
      )}
    </main>
  );
}
