import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";
import logoImage from "../../images/header-logo.svg";
import styles from "./AuthForm.module.css";
import useFormAndValidation from "../useFormAndValidation/useFormAndValidation";

// Компонент формы авторизации/регистрации
function AuthForm({
  isLogin,
  title,
  buttonText,
  alternativeText,
  alternativeLink,
  onSubmitAction,
}) {
  // Хуки для управления данными и валидации формы
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      onSubmitAction(values.email, values.password);
    } else {
      onSubmitAction(values.name, values.email, values.password);
    }
  };

  return (
    <main className={styles.auth}>
      <div className={styles["auth__top"]}>
        {/* Логотип */}
        <Link to="/">
          <img
            src={logoImage}
            alt="Логотип компании"
            className={styles["auth__logo"]}
          />
        </Link>

        {/* Заголовок формы */}
        <h1 className={styles["auth__title"]}>{title}</h1>
      </div>

      <Form onSubmit={handleSubmit} className={styles["auth__form"]}>
        {/* Поле "Имя" отображается только при регистрации */}
        {!isLogin && (
          <React.Fragment>
            <label htmlFor="name" className={styles["auth__label"]}>
              Имя
            </label>
            <Input
              type="text"
              placeholder="Введите ваше имя"
              value={values.name || ""}
              onChange={handleChange}
              name="name"
              id="name"
              required
              minLength="2"
              maxLength="50"
              className={styles["auth__input"]}
            />
            {/* Отображение ошибок валидации для поля "Имя" */}
            <span id="name-error" className={styles["validation-text"]}>
              {errors.name}
            </span>
          </React.Fragment>
        )}

        {/* Поле "E-mail" */}
        <label htmlFor="email" className={styles["auth__label"]}>
          E-mail
        </label>
        <Input
          type="email"
          placeholder="Введите ваш email"
          value={values.email || ""}
          onChange={handleChange}
          name="email"
          id="email"
          required
          className={styles["auth__input"]}
        />
        {/* Отображение ошибок валидации для поля "E-mail" */}
        <span id="email-error" className={styles["validation-text"]}>
          {errors.email}
        </span>

        {/* Поле "Пароль" */}
        <label htmlFor="password" className={styles["auth__label"]}>
          Пароль
        </label>
        <Input
          type="password"
          placeholder="Введите ваш пароль"
          value={values.password || ""}
          onChange={handleChange}
          name="password"
          id="password"
          required
          minLength="8"
          maxLength="50"
          className={styles["auth__input"]}
        />
        {/* Отображение ошибок валидации для поля "Пароль" */}
        <span id="password-error" className={styles["validation-text"]}>
          {errors.password}
        </span>

        {/* Кнопка отправки формы */}
        <button
          type="submit"
          className={`${styles["auth__button"]} ${
            isLogin
              ? styles["auth__button_login"]
              : styles["auth__button_register"]
          }`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
        {/* Альтернативный текст и ссылка для переключения между регистрацией и входом */}
        {alternativeText && alternativeLink && (
          <div className={styles["auth__bottom"]}>
            <p className={styles["auth__bottom-text"]}>
              {alternativeText}{" "}
              <Link
                to={alternativeLink}
                className={styles["auth__bottom-link"]}
              >
                {isLogin ? "Регистрация" : "Войти"}
              </Link>
            </p>
          </div>
        )}
      </Form>
    </main>
  );
}

export default AuthForm;
