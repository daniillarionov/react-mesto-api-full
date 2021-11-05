import React from "react";
function PageWithLogin({
    title,
    loadingText,
    buttonText,
    isLoading,
    children,
    onSubmit
  }) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      password: passwordRef.current.value,
      email: emailRef.current.value      
    });
  }
    return (
        <div className="login__container">
          <h2 className="login__title">{title}</h2>
          <form
            className={`login login__form`}
            onSubmit={handleSubmit}
          >
            <section className="login__form-section">
              <input
                type="email"
                placeholder="Email"
                className="login__input login-email__input"
                name="email"
                required
                minLength={2}
                maxLength={40}
                ref={emailRef}
              />
              <span className="login__input-error" />
              <input
                type="password"
                placeholder="Пароль"
                className="login__input login-password__input"
                name="password"
                required
                minLength={8}
                maxLength={40}
                ref={passwordRef}
              />
              <span className="login__input-error" />
              <button type="submit" className="login__submit">
                {isLoading ? loadingText : buttonText}
              </button>
              {children}
            </section>
          </form>
        </div>
    );
  }
  export default PageWithLogin;
  