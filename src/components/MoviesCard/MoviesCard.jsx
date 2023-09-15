import React, { useState } from "react";
import styles from "./MoviesCard.module.css";
import filmPhoto from "../../images/film-photo.svg";

function MoviesCard({ isSavedPage }) {
  // Хук состояния, чтобы проверить, сохранен ли фильм
  const [isSaved, setIsSaved] = useState(false);

  const handleButtonClick = () => {
    if (isSavedPage) {
      // Если находимся на странице сохраненных фильмов, логика для удаления фильма будет реализована здесь
    } else {
      // На странице всех фильмов, переключаем состояние сохранения фильма
      setIsSaved((prevState) => !prevState);
    }
  };

  return (
    <article className={styles.card}>
      {/* Постер фильма */}
      <img
        src={filmPhoto}
        alt="Постер фильма"
        className={styles["card__photo"]}
      />
      <div className={styles["card__description"]}>
        <div className={styles["card__info"]}>
          {/* Название фильма */}
          <h3 className={styles["card__title"]}>33 слова о дизайне</h3>
          {isSavedPage ? (
            // Если находимся на странице сохраненных фильмов, показываем кнопку для удаления фильма
            <button
              className={styles["card__delete"]}
              aria-label="Удалить фильм"
              onClick={handleButtonClick}
            ></button>
          ) : (
            // Иначе показываем кнопку для сохранения фильма
            <button
              onClick={handleButtonClick}
              className={`${styles["card__save"]} ${
                isSaved ? styles["card__save-active"] : ""
              }`}
              aria-label="Сохранить фильм"
            ></button>
          )}
        </div>
        {/* Длительность фильма */}
        <p className={styles["card__duration"]}>1ч42м</p>
      </div>
    </article>
  );
}

export default MoviesCard;
