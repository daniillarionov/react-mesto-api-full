import React from "react";
import PopupWithForm from "./PopupWithForm";
function DeleteCardPopup({
  card,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  loadingText,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(card);
  }
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={loadingText}
    />
  );
}
export default DeleteCardPopup;
