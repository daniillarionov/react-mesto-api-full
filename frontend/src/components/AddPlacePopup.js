import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
  loadingText,
}) {
  const addPlaceLinkRef = React.useRef();
  const addPlaceNameRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: addPlaceNameRef.current.value,
      link: addPlaceLinkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__input popup-add-card__input popup-add-card__input_name"
        name="name"
        required
        ref={addPlaceNameRef}
        minLength={2}
        maxLength={30}
      />
      <span className="popup__input-error" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup-add-card__input popup-add-card__input_link"
        name="link"
        required
        ref={addPlaceLinkRef}
      />
      <span className="popup__input-error" />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
