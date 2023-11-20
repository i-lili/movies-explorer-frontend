import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onLogin, loginError }) {
  return (
    <AuthForm
      isLogin={true}
      title="Рады видеть!"
      buttonText="Войти"
      alternativeText="Ещё не зарегистрированы?"
      alternativeLink="/signup"
      onSubmitAction={(email, password) => {
        onLogin(email, password);
      }}
      error={loginError}
    />
  );
}

export default Login;
