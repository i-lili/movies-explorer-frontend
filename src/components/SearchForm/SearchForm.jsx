import React, { useState } from "react";
import styles from "./SearchForm.module.css";
import searchIcon from "../../images/icon-search.svg";
import findIcon from "../../images/find-icon.svg";

function SearchForm({ onSearch, query, setQuery, isShort, setIsShort }) {
  // Состояния для отслеживания отправки формы и ошибки валидации
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Обработчик отправки формы поиска фильмов
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setFormError("Нужно ввести ключевое слово");
      return;
    }
    setIsSubmitting(true);
    try {
      onSearch(query, isShort);
      setFormError("");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработчик изменения чекбокса для короткометражных фильмов
  const handleCheckboxChange = (e) => {
    setIsShort(e.target.checked);
    onSearch(query, e.target.checked);
  };

  return (
    <section className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        {formError && <p className={styles.error}>{formError}</p>}
        <div className={styles.search__box}>
          <img src={searchIcon} alt="Иконка поиска" className={styles.search__icon} />
          <input
            type="text"
            placeholder="Фильм"
            className={styles.search__input}
            aria-label="Поиск фильма"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isSubmitting}
          />
          <button type="submit" className={styles.search__button} disabled={isSubmitting}>
            <img src={findIcon} alt="Кнопка поиска" />
          </button>
          <div className={styles.search__separator}></div>
        </div>
        <div className={styles.search__checkbox}>
          <input
            type="checkbox"
            id="short-movies"
            className={styles.search__checkboxInput}
            checked={isShort}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="short-movies" className={styles.search__checkboxLabel}>
            Короткометражки
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
