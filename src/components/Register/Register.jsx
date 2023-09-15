import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
    return (
        <AuthForm
            isLogin={false}
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            alternativeText="Уже зарегистрированы?"
            alternativeLink="/signin"
            onSubmitAction={(name, email, password) => {
                // В этом месте будет  код для регистрации пользователя
                console.log(name, email, password);
            }}
        />
    );
}

export default Register;
