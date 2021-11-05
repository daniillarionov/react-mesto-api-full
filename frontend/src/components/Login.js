import PageWithLogin from './PageWithLogin';
function Login({
    isLoading,
    loadingText,
    onLogin
  }) {
    return (
      <PageWithLogin
        title="Вход"
        buttonText="Войти"
        isLoading={isLoading}
        loadingText={loadingText}
        onSubmit={onLogin}
      />
    );
  }
  export default Login;