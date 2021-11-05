import React from "react";
function Header({
  buttonLoginText,
  onSignOut,
  loggedIn,
  currentUserEmail,
  handleButtonLoginClick,
}) {
  return (
    <header className="header">
      <a href="" className="header__logo" target="_blank" rel="noopener" />
      {loggedIn ? (
        <div className="header__container">
          <p className="header__identifier">{currentUserEmail}</p>
          <button
            type="button"
            onClick={onSignOut}
            className="header__button header__button_quit"
          >
            Выйти
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleButtonLoginClick}
          className="header__button"
        >
          {buttonLoginText}
        </button>
      )}
    </header>
  );
}
export default Header;
