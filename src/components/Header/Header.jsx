import React from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/header-logo.svg";
import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  // Определяем стиль для заголовка в зависимости от текущего маршрута
  const headerClassName =
    location.pathname === "/"
      ? `${styles.header} ${styles["header--main"]}`
      : `${styles.header}`;

  return (
    <header className={headerClassName}>
      {/* Логотип, который при клике перенаправляет на главную страницу */}
      <Link to="/">
        <img src={headerLogo} className={styles["header__logo"]} alt="Logo" />
      </Link>

      {/* Компонент навигации */}
      <Navigation
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Если пользователь не авторизован, отображаем ссылки для входа и регистрации */}
      {!loggedIn && (
        <ul className={styles["header__auth-list"]}>
          <li className={styles["header__auth-item"]}>
            <Link
              to="/signup"
              className={`${styles["header__auth-link--register"]}`}
            >
              Регистрация
            </Link>
          </li>
          <li className={styles["header__auth-item"]}>
            <Link to="/signin" className={styles["header__auth-button"]}>
              Войти
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
