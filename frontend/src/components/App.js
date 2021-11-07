import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import api from "../utils/Api";
import apiAuth from "../utils/ApiAuth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterState, setIsRegisterState] = useState(false);
  const [currentPageLogin, setCurrentPageLogin] = useState(true);
  const [buttonLoginText, setButtonLoginText] = useState("Регистрация");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const history = useHistory();
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth
        .validToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUserEmail(res.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleButtonQuitClick() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
    setCurrentPageLogin(true);
  }
  function handleButtonLoginClick() {
    if (currentPageLogin) {
      history.push("/sign-up");
      setButtonLoginText("Войти");
      setCurrentPageLogin(false);
    } else {
      history.push("/sign-in");
      setButtonLoginText("Регистрация");
      setCurrentPageLogin(true);
    }
  }
  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedDeleteCard(card);
  }
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .updateUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleRegister({ password, email }) {
    setIsLoading(true)
    apiAuth
      .register({ password, email })
      .then(() => {
        setIsRegisterState(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsRegisterState(false);
        console.log(err);
      }).finally(() => {        
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  }
  function handleLogin({ password, email }) {
    setIsLoading(true)
    apiAuth
      .login({ password, email })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUserEmail(email);
        setLoggedIn(true);
        history.push("/");
        api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
      });
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegisterState(false);
        setButtonLoginText("Зарегистрироваться");
        setCurrentPageLogin(true);
        console.log(err);
      }).finally(() => {
        setIsLoading(false);
      });
  }
  function handleClickAlreadyLogin() {
    history.push("/sign-in");
    setCurrentPageLogin(false);
  }
  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          buttonLoginText={buttonLoginText}
          onSignOut={handleButtonQuitClick}
          handleButtonLoginClick={handleButtonLoginClick}
          loggedIn={loggedIn}
          currentUserEmail={currentUserEmail}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDeleteClick}
            onCardLike={handleCardLike}
            loggedIn={loggedIn}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin}            
          isLoading={isLoading}
          loadingText={"Аутентификация..."} />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              handleClickAlreadyLogin={handleClickAlreadyLogin}           
              isLoading={isLoading}
              loadingText={"Регистрация..."} 
            />
          </Route>
          <Footer />
        </Switch>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          loadingText={"Сохранение..."}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          loadingText={"Сохранение..."}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          loadingText={"Сохранение..."}
        />
        <DeleteCardPopup
          card={selectedDeleteCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
          loadingText={"Удаление..."}
        />
        <ImagePopup
          card={selectedCard === null ? {} : selectedCard}
          onClose={closeAllPopups}
          isOpen={selectedCard ? "popup_opened" : ""}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegisterState={isRegisterState}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
