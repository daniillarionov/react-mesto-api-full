import editAvatar from '../images/avatar-edit.svg';
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фотография профиля"
            />
            <button
              className="profile__avatar-overlay"
              aria-label="Редактировать аватар"
              onClick={onEditAvatar}
            >
              <img src={editAvatar} className="profile__avatar-edit" alt="Изобраэение аватар" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.reverse().map((item) => {
          return (
            <Card
              card={item}
              key={item._id}
              onClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
