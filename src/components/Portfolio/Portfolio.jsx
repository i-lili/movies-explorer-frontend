import React from "react";
import styles from "./Portfolio.module.css";
import arrowImage from "../../images/project-arrow.svg";

// Компонент для отображения портфолио
const Portfolio = () => {
  return (
    <section className={styles.portfolio}>
      {/* Заголовок раздела портфолио */}
      <h2 className={styles.portfolio__title}>Портфолио</h2>

      {/* Список проектов в портфолио */}
      <ul className={styles.portfolio__list}>
        <li className={styles.portfolio__item}>
          {/* Заголовок проекта */}
          <h3 className={styles.portfolio__itemTitle}>Статичный сайт</h3>
          {/* Ссылка на проект с изображением стрелки */}
          <a
            href="https://github.com/i-lili/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.portfolio__link}
          >
            <img
              src={arrowImage}
              alt="Стрелка указывающая на проект Статичный сайт"
              className={styles.portfolio__arrow}
            />
          </a>
        </li>
        <li className={styles.portfolio__item}>
          <h3 className={styles.portfolio__itemTitle}>Адаптивный сайт</h3>
          <a
            href="https://github.com/i-lili/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.portfolio__link}
          >
            <img
              src={arrowImage}
              alt="Стрелка указывающая на проект Адаптивный сайт"
              className={styles.portfolio__arrow}
            />
          </a>
        </li>
        <li className={styles.portfolio__item}>
          <h3 className={styles.portfolio__itemTitle}>
            Одностраничное приложение
          </h3>
          <a
            href="https://github.com/i-lili/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.portfolio__link}
          >
            <img
              src={arrowImage}
              alt="Стрелка указывающая на проект Одностраничное приложение"
              className={styles.portfolio__arrow}
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
