import React from "react";
import styles from "./Profile.module.css";

// Компонент для отображения профиля пользователя
function Profile({ onLogout }) {
  return (
    <main className={styles.profile}>
      <h1 className={styles.profile__title}>Привет, Виталий!</h1>

      <div className={styles.profile__info}>
        <label htmlFor="name" className={styles.profile__label}>
          Имя
        </label>
        <input
          id="name"
          className={styles.profile__dataInput}
          type="text"
          readOnly
          value="Виталий"
        />
      </div>

      <div className={styles.profile__info}>
        <label htmlFor="email" className={styles.profile__label}>
          E-mail
        </label>
        <input
          id="email"
          className={styles.profile__dataInput}
          type="email"
          readOnly
          value="pochta@yandex.ru"
        />
      </div>

      <button
        className={styles.profile__edit}
        aria-label="Редактировать профиль"
      >
        Редактировать
      </button>

      <button
        className={styles.profile__logout}
        aria-label="Выйти из аккаунта"
        onClick={onLogout}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
