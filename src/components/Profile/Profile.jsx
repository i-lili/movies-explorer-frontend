import React, { useState, useEffect, useContext } from "react";
import styles from "./Profile.module.css";
import useFormAndValidation from "../useFormAndValidation/useFormAndValidation";
import Form from "../Form/Form";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ onLogout, onUpdateUser, profileError, setProfileError }) {
  // Получение данных текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Хуки для управления формой редактирования профиля
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  // Состояние для отслеживания режима редактирования профиля
  const [isEditing, setIsEditing] = useState(false);

  // Состояние для отслеживания состояния отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Состояние для отображения сообщения об успешном/неуспешном обновлении профиля
  const [editMessage, setEditMessage] = useState({ text: "", type: "" });

  // Проверка наличия изменений в данных профиля
  const hasChanges =
    values.name !== currentUser?.name || values.email !== currentUser?.email;

  // Установка начальных значений формы при получении данных о текущем пользователе
  useEffect(() => {
    if (currentUser && !isEditing) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser, setValues, isEditing]);

  // Обновление сообщения об ошибке
  useEffect(() => {
    if (profileError) {
      setEditMessage({
        text: profileError,
        type: "error",
      });
    }
  }, [profileError]);

  // Обработчик отправки формы для обновления профиля
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdateUser(values.name, values.email);
      setEditMessage({ text: "Профиль успешно обновлен!", type: "success" });
      setIsEditing(false);
    } catch (error) {
      setEditMessage({
        text: "Произошла ошибка при обновлении профиля.",
        type: "error",
      });
      setIsEditing(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.profile}>
      <h1 className={styles.profile__title}>Привет, {currentUser.name}!</h1>
      <Form onSubmit={handleSubmit}>
        <div className={styles.profile__info}>
          <label htmlFor="name" className={styles.profile__label}>
            Имя
          </label>
          <input
            id="name"
            className={styles.profile__dataInput}
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="50"
            disabled={!isEditing || isSubmitting}
          />
          <span className={styles["profile__validation-text"]}>
            {errors.name}
          </span>
        </div>

        <div className={styles.profile__info}>
          <label htmlFor="email" className={styles.profile__label}>
            E-mail
          </label>
          <input
            id="email"
            className={styles.profile__dataInput}
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            required
            disabled={!isEditing || isSubmitting}
          />
          <span className={styles["profile__validation-text"]}>
            {errors.email}
          </span>
        </div>

        {/* Кнопка для сохранения изменений или перехода в режим редактирования */}
        {isEditing ? (
          <button
            className={`${styles.profile__save} ${
              (!isValid || !hasChanges) && styles.profile__save_inactive
            }`}
            type="submit"
            aria-label="Сохранить"
            disabled={!isValid || !hasChanges || isSubmitting}
          >
            Сохранить
          </button>
        ) : (
          <button
            className={styles.profile__edit}
            type="button"
            aria-label="Редактировать профиль"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
              setEditMessage({ text: "", type: "" });
              setProfileError(null);
            }}
            disabled={isSubmitting}
          >
            Редактировать
          </button>
        )}
      </Form>

      {/* Отображение сообщения об успешном/неуспешном обновлении профиля */}
      {editMessage.text && (
        <p
          className={
            editMessage.type === "success"
              ? styles["profile__message-success"]
              : styles["profile__message-error"]
          }
        >
          {editMessage.text}
        </p>
      )}

      {/* Кнопка для выхода из аккаунта */}
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
