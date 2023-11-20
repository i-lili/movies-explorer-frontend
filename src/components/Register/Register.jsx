import React from "react";
import AuthForm from "../AuthForm/AuthForm";

function Register({ onRegister, registrationError }) {  
  const handleSubmit = (name, email, password) => {
    onRegister(name, email, password);
};


  return (
    <AuthForm
      isLogin={false}
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      alternativeText="Уже зарегистрированы?"
      alternativeLink="/signin"
      onSubmitAction={handleSubmit}  
      error={registrationError}     
    />
  );
}

export default Register;
