import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import styles from "./MoviesCardList.module.css";

function MoviesCardList({ movies, isSavedPage }) {
  // Демонстрационный массив карточек
  const demoCards = [
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
    { title: "33 слова о дизайне", duration: "1ч42м" },
  ];

  // Состояние для учета количества отображаемых карточек
  const [displayedCardsCount, setDisplayedCardsCount] = useState(0);

  useEffect(() => {
    // Функция для обновления количества отображаемых карточек в зависимости от ширины экрана
    const updateDisplayedCardsCount = () => {
      const screenWidth = window.innerWidth;

      // Устанавливаем количество карточек в зависимости от ширины экрана
      if (screenWidth >= 1280) {
        setDisplayedCardsCount(16);
      } else if (screenWidth >= 1010) {
        setDisplayedCardsCount(12);
      } else if (screenWidth >= 620) {
        setDisplayedCardsCount(8);
      } else {
        setDisplayedCardsCount(4);
      }
    };

    // Добавляем слушатель событий для изменения размера окна
    window.addEventListener("resize", updateDisplayedCardsCount);
    // Изначальное установление количества карточек
    updateDisplayedCardsCount();

    // Удаляем слушатель событий при размонтировании компонента
    return () => {
      window.removeEventListener("resize", updateDisplayedCardsCount);
    };
  }, []);

  // Обработчик нажатия на кнопку "Ещё"
  const handleMoreButtonClick = () => {
    // Увеличиваем количество отображаемых карточек на 4
    setDisplayedCardsCount(displayedCardsCount + 4);
  };

  return (
    <section className={styles["movies-card-list"]}>
      <ul className={styles["movies-card-list__cards"]}>
        {/* Отображаем только определенное количество карточек на основе состояния */}
        {demoCards.slice(0, displayedCardsCount).map((card, index) => (
          <li key={index}>
            <MoviesCard
              title={card.title}
              duration={card.duration}
              isSavedPage={isSavedPage}
            />
          </li>
        ))}
      </ul>
      {/* Отображаем кнопку "Ещё", если есть еще карточки для отображения */}
      {demoCards.length > displayedCardsCount && (
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

export default MoviesCardList;
