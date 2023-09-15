import React from "react";
import styles from "./Profile.module.css";

// Компонент для отображения профиля пользователя
function Profile() {
  return (
    <section className={styles.profile}>
      <h1 className={styles.profile__title}>Привет, Виталий!</h1>

      <div className={styles.profile__info}>
        <p className={styles.profile__label}>Имя</p>
        <input
          className={styles.profile__dataInput}
          type="text"
          readOnly  // поле только для чтения
          value="Виталий"
        />
      </div>

      <div className={styles.profile__info}>
        <p className={styles.profile__label}>E-mail</p>
        <input
          className={styles.profile__dataInput}
          type="email"
          readOnly  // поле только для чтения
          value="pochta@yandex.ru"
        />
      </div>

      <button
        className={styles.profile__edit}
        aria-label="Редактировать профиль"
      >
        Редактировать
      </button>

      <button className={styles.profile__logout} aria-label="Выйти из аккаунта">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
