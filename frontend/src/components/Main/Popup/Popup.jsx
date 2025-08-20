import { useContext } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";

export default function Popup(props) {
  const { onClose, title, children, isLoggedIn } = props;
  const { windowSize } = useContext(CurrentUserContext);

  const closeRegister =
    windowSize.width < 768 && !isLoggedIn ? "popup__close-register-button" : "";

  const handleClassName = () => {
    if (!isLoggedIn) {
      return "popup__container-registered";
    }
    return !title ? "popup__image" : "popup__container";
  };

  return (
    <div className="popup">
      <div className={handleClassName()}>
        <button
          aria-label="Close modal"
          className={`popup__close ${closeRegister}`}
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
