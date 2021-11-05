import { useState } from "react";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  loadingText,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      <input
        type="text"
        placeholder="Имя пользователя"
        className="popup__input popup-profile__input popup-profile__input_username"
        name="username"
        required
        minLength={2}
        maxLength={40}
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__input-error" />
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup-profile__input popup-profile__input_job"
        name="job"
        required
        minLength={2}
        maxLength={200}
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
