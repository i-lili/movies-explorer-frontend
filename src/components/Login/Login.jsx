import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return (
    <AuthForm
      isLogin={true}
      title="Рады видеть!"
      buttonText="Войти"
      alternativeText="Ещё не зарегистрированы?"
      alternativeLink="/signup"
      onSubmitAction={(email, password) => {
        // В этом месте будет код для авторизации пользователя
        console.log(email, password);
      }}
    />
  );
}

export default Login;
