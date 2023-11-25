import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import styles from "./MoviesCardList.module.css";
import {
  INITIAL_CARDS_TO_SHOW,
  ADDITIONAL_CARDS_TO_LOAD,
  SCREEN_WIDTH_BREAKPOINTS,
} from "../../constants/constants";

function MoviesCardList({
  movies,
  isSavedPage,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  showMoreButton = true,
}) {
  // Инициализация состояния для отображаемого количества карточек
  const initialCardsToShow = showMoreButton
    ? getCardSettings().cardsToShow
    : movies.length;
  const [displayedCardsCount, setDisplayedCardsCount] =
    useState(initialCardsToShow);

  // Обработчик кнопки "Ещё", который увеличивает отображаемое количество карточек
  const handleMoreButtonClick = () => {
    const { cardsToLoad } = getCardSettings();
    setDisplayedCardsCount((prev) => prev + cardsToLoad);
  };

  // Эффект сбрасывает количество отображаемых карточек
  // при каждом новом поиске (изменении movies)
  useEffect(() => {
    const { cardsToShow } = getCardSettings();
    setDisplayedCardsCount(cardsToShow);
  }, [movies]);

  useEffect(() => {
    if (showMoreButton) {
      let resizeTimeout;

      // Обработчик изменения размера окна для адаптивного отображения карточек
      const updateDisplayedCardsCount = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const { cardsToShow } = getCardSettings();
          setDisplayedCardsCount(cardsToShow);
        }, 300);
      };

      // Добавление слушателя события изменения размера окна
      window.addEventListener("resize", updateDisplayedCardsCount);

      // Удаление слушателя события и очистка таймаута при размонтировании компонента
      return () => {
        window.removeEventListener("resize", updateDisplayedCardsCount);
        if (resizeTimeout) clearTimeout(resizeTimeout);
      };
    }
  }, [showMoreButton]);

  return (
    <section className={styles["movies-card-list"]}>
      <ul className={styles["movies-card-list__cards"]}>
        {movies
          .slice(0, showMoreButton ? displayedCardsCount : movies.length)
          .map((movie) => (
            <li key={movie._id || movie.id}>
              <MoviesCard
                movie={movie}
                isSavedPage={isSavedPage}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
              />
            </li>
          ))}
      </ul>

      {/* Отображение кнопки "Ещё", если есть дополнительные карточки */}
      {showMoreButton && movies.length > displayedCardsCount && (
        <button
          type="button"
          className={styles["movies-card-list__more-button"]}
          onClick={handleMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

// Функция для определения настроек отображения карточек в зависимости от ширины окна
const getCardSettings = () => {
  const width = window.innerWidth;

  if (width >= SCREEN_WIDTH_BREAKPOINTS.wide)
    return {
      cardsToShow: INITIAL_CARDS_TO_SHOW.wide,
      cardsToLoad: ADDITIONAL_CARDS_TO_LOAD.wide,
    };
  if (width >= SCREEN_WIDTH_BREAKPOINTS.medium)
    return {
      cardsToShow: INITIAL_CARDS_TO_SHOW.medium,
      cardsToLoad: ADDITIONAL_CARDS_TO_LOAD.medium,
    };
  if (width >= SCREEN_WIDTH_BREAKPOINTS.narrow)
    return {
      cardsToShow: INITIAL_CARDS_TO_SHOW.narrow,
      cardsToLoad: ADDITIONAL_CARDS_TO_LOAD.narrow,
    };
  return {
    cardsToShow: INITIAL_CARDS_TO_SHOW.extraNarrow,
    cardsToLoad: ADDITIONAL_CARDS_TO_LOAD.extraNarrow,
  };
};

export default MoviesCardList;
