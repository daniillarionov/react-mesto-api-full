import React from "react";
import PageWithLogin from "./PageWithLogin";
function Register({
  isLoading,
  loadingText,
  onRegister,
  handleClickAlreadyLogin,
}) {
  return (
    <PageWithLogin
      title="Регистрация"
      buttonText="Зарегистрироваться"
      isLoading={isLoading}
      loadingText={loadingText}
      onSubmit={onRegister}
    >
      <button className="login__link" onClick={handleClickAlreadyLogin}>
        Уже зарегистрированы? Войти
      </button>
    </PageWithLogin>
  );
}
export default Register;
