import Popup from "./Popup";
function PopupWithForm({
  title,
  loadingText,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <Popup isOpen={isOpen} className={name} onClose={onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className={`popup__form popup-${name}__form`}
          onSubmit={onSubmit}
        >
          <section className="popup__form-section">
            {children}
            <button type="submit" className="popup__submit">
              {isLoading ? loadingText : buttonText}
            </button>
          </section>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className={`popup__close popup-${name}__close`}
          onClick={onClose}
        />
      </div>
    </Popup>
  );
}
export default PopupWithForm;
