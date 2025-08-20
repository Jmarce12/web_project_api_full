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
  const handleOpenPopup = props.onOpenPopup;
  const handleClosePopup = props.onClosePopup;

  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        onAddPlaceSubmit={props.onAddPlaceSubmit}
        onClose={handleClosePopup}
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
          onClick={() => handleOpenPopup(editAvatarPopup)}
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
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>
      <ul className="cards__list">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={handleOpenPopup}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
      {props.popup && (
        <Popup
          onClose={handleClosePopup}
          title={props.popup.title}
          isLoggedIn={props.isLoggedIn}
        >
          {props.popup.children}
        </Popup>
      )}
    </main>
  );
}
