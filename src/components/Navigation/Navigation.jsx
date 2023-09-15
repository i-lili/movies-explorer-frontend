import React from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";
import styles from "./Navigation.module.css";

const Navigation = ({ loggedIn, isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  // Функция переключает состояние меню (открыть/закрыть)
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Определение классов для меню, в зависимости от его состояния (открыто/закрыто)
  const menuClass = `${styles["navigation__menu"]} ${
    isMenuOpen ? styles["navigation__menu_active"] : ""
  }`;

  return (
    <nav className={styles.navigation}>
      {loggedIn ? (
        <>
          {/* Кнопка бургер-меню для мобильных версий */}
          <button
            type="button"
            onClick={toggleMenu}
            className={styles["navigation__burger-icon-container"]}
            aria-label="Открыть меню"
          />
          {/* Отображение выпадающего меню при его активации */}
          {isMenuOpen && (
            <>
              {/* Затемнение экрана при активации меню */}
              <div className={styles["navigation__overlay"]}></div>
              {/* Выпадающее меню */}
              <aside className={menuClass}>
                <div className={styles["navigation__menu-top"]}>
                  {/* Кнопка закрытия меню */}
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className={styles["navigation__close-icon-container"]}
                    aria-label="Закрыть меню"
                  />
                  {/* Основные ссылки навигации в меню */}
                  <ul className={styles["navigation__list"]}>
                    <li className={styles["navigation__item"]}>
                      <Link
                        to="/"
                        onClick={toggleMenu}
                        className={
                          location.pathname === "/"
                            ? `${styles["navigation__link"]} ${styles["navigation__link_underline"]}`
                            : styles["navigation__link"]
                        }
                      >
                        Главная
                      </Link>
                    </li>
                    <li className={styles["navigation__item"]}>
                      <Link
                        to="/movies"
                        onClick={toggleMenu}
                        className={
                          location.pathname === "/movies"
                            ? `${styles["navigation__link"]} ${styles["navigation__link_underline"]}`
                            : styles["navigation__link"]
                        }
                      >
                        Фильмы
                      </Link>
                    </li>
                    <li className={styles["navigation__item"]}>
                      <Link
                        to="/saved-movies"
                        onClick={toggleMenu}
                        className={
                          location.pathname === "/saved-movies"
                            ? `${styles["navigation__link"]} ${styles["navigation__link_underline"]}`
                            : styles["navigation__link"]
                        }
                      >
                        Сохранённые фильмы
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Секция аккаунта в меню */}
                <ul className={styles["navigation__account-list"]}>
                  <li className={styles["navigation__item"]}>
                    <Link
                      to="/profile"
                      className={styles["navigation__account-button"]}
                      onClick={toggleMenu}
                    >
                      <img
                        src={profileIcon}
                        className={styles["navigation__profile-icon"]}
                        alt="Иконка профиля"
                      />
                      Аккаунт
                    </Link>
                  </li>
                </ul>
              </aside>
            </>
          )}
          {/* Ссылки навигации для десктопной версии */}
          <ul className={styles["navigation__movies"]}>
            <li className={styles["navigation__item"]}>
              <Link
                to="/movies"
                className={
                  location.pathname === "/movies"
                    ? `${styles["navigation__link"]} ${styles["navigation__link_state_active"]}`
                    : styles["navigation__link"]
                }
              >
                Фильмы
              </Link>
            </li>
            <li className={styles["navigation__item"]}>
              <Link
                to="/saved-movies"
                className={
                  location.pathname === "/saved-movies"
                    ? `${styles["navigation__link"]} ${styles["navigation__link_state_active"]}`
                    : styles["navigation__link"]
                }
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          {/* Кнопка аккаунта для десктопной версии */}
          <ul className={styles["navigation__account"]}>
            <li className={styles["navigation__item"]}>
              <Link
                to="/profile"
                className={styles["navigation__account-button"]}
                onClick={toggleMenu}
              >
                <img
                  src={profileIcon}
                  className={styles["navigation__profile-icon"]}
                  alt="Иконка профиля"
                />
                Аккаунт
              </Link>
            </li>
          </ul>
        </>
      ) : null}
    </nav>
  );
};

export default Navigation;
