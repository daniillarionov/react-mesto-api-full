function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup ${isOpen} popup-view-card`}>
      <div className="popup-view-card__container">
        <img
          className="popup-view-card__image"
          alt={`Изображение ${card.name}`}
          src={card.link}
        />
        <h2 className="popup-view-card__caption">{card.name}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close popup-view-card__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default ImagePopup;
