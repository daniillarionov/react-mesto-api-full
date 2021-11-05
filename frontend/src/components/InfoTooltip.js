import Popup from "./Popup";
function InfoTooltip({ isOpen, onClose, isRegisterState }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} className="popup">
      <div className="popup__container ">
        {isRegisterState ? (
          <div className="popup__icon"></div>
        ) : (
          <div className="popup__icon_fail"></div>
        )}
        <h2 className="popup__title">
          {isRegisterState
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так!Попробуйте ещё раз."}
        </h2>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close"
        />
      </div>
    </Popup>
  );
}
export default InfoTooltip;
