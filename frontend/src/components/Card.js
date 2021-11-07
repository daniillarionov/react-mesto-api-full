import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete-button" : "element__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  function handleClick() {
    onClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="element">
      <img
        className="element__image"
        alt={`Изображение ${card.name}`}
        src={card.link}
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__description">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-section">
          <button
            type="button"
            aria-label="Нравится"
            className={`element__like ${
              isLiked ? "element__like_active" : "element__like"
            }`}
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
