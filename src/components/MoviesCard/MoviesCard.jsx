import React, { useState, useEffect } from "react";
import styles from "./MoviesCard.module.css";

function MoviesCard({
  movie,
  isSavedPage,
  onSaveMovie,
  onDeleteMovie, 
  savedMovies,
}) {
  // Состояние для отслеживания, сохранен ли фильм
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Проверка, сохранен ли фильм в списке сохраненных фильмов
    const isMovieSaved =
      savedMovies &&
      savedMovies.some(
        (savedMovie) => savedMovie.movieId === (movie && movie.id)
      );
    setIsSaved(isMovieSaved);
  }, [savedMovies, movie]);

  // Обработчик кнопки для сохранения или удаления фильма
  const handleButtonClick = () => {
    const movieId = isSavedPage ? movie._id : movie.id;

    if (isSavedPage) {
      onDeleteMovie(movieId);
    } else {
      if (isSaved) {
        // Поиск сохраненного фильма для его удаления
        const savedMovie = savedMovies.find(
          (saved) => saved.movieId === movie.id
        );
        onDeleteMovie(savedMovie._id);
      } else {
        onSaveMovie(movie);
      }
    }
  };

  // Определение источника изображения фильма
  const imageSource = isSavedPage
    ? movie.image
    : `https://api.nomoreparties.co${movie.image.url || movie.image}`;

  return (
    <article className={styles.card}>
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          src={imageSource}
          alt="Постер фильма"
          className={styles["card__photo"]}
        />
      </a>
      <div className={styles["card__description"]}>
        <div className={styles["card__info"]}>
          <h3 className={styles["card__title"]}>{movie.nameRU}</h3>
          {isSavedPage ? (
            // Кнопка для удаления фильма
            <button
              className={styles["card__delete"]}
              aria-label="Удалить фильм"
              onClick={handleButtonClick}
            ></button>
          ) : (
            // Кнопка для сохранения или удаления фильма
            <button
              onClick={handleButtonClick}
              className={`${styles["card__save"]} ${
                isSaved ? styles["card__save-active"] : ""
              }`}
              aria-label={isSaved ? "Удалить фильм" : "Сохранить фильм"}
            ></button>
          )}
        </div>
        {/* Длительность фильма */}
        <p className={styles["card__duration"]}>
          {Math.floor(movie.duration / 60)}ч{movie.duration % 60}м
        </p>
      </div>
    </article>
  );
}

export default MoviesCard;
