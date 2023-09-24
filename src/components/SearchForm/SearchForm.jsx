import React from "react";
import styles from "./SearchForm.module.css";
import searchIcon from "../../images/icon-search.svg";
import findIcon from "../../images/find-icon.svg";

// Компонент формы поиска фильмов
function SearchForm() {
  return (
    <section className={styles.search}>
      {/* Форма для поиска */}
      <form className={styles.search__form}>
        <div className={styles.search__box}>
          {/* Иконка поиска */}
          <img
            src={searchIcon}
            alt="Иконка поиска"
            className={styles.search__icon}
          />
          {/* Поле ввода для текста поиска */}
          <input
            type="text"
            placeholder="Фильм"
            className={styles.search__input}
            aria-label="Поиск фильма"
          />
          {/* Кнопка для отправки формы поиска */}
          <button type="submit" className={styles.search__button}>
            <img src={findIcon} alt="Кнопка поиска" />
          </button>
          {/* Визуальный разделитель в форме */}
          <div className={styles.search__separator}></div>
        </div>
        {/* Чекбокс для фильтрации короткометражных фильмов */}
        <div className={styles.search__checkbox}>
          <input
            type="checkbox"
            id="short-movies"
            className={styles.search__checkboxInput}
          />
          <label
            htmlFor="short-movies"
            className={styles.search__checkboxLabel}
          >
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
