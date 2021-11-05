import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  loadingText,
}) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup-edit-avatar__input popup-edit-avatar__input_link"
        name="link"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
