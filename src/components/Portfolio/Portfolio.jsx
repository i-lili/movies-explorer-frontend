import React from "react";
import styles from "./Portfolio.module.css";
import arrowImage from "../../images/project-arrow.svg";

// Компонент для отображения портфолио
const Portfolio = () => {
  return (
    <section className={styles.portfolio}>
      <h2 className={styles["portfolio__title"]}>Портфолио</h2>

      <ul className={styles["portfolio__list"]}>
        <li className={styles["portfolio__item"]}>
          <a
            href="https://github.com/i-lili/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["portfolio__link"]}
          >
            <h3 className={styles["portfolio__item-title"]}>Статичный сайт</h3>
            <img
              src={arrowImage}
              alt="Ссылка на проект Статичный сайт с изображением стрелки"
              className={styles["portfolio__link-arrow"]}
            />
          </a>
        </li>

        <li className={styles["portfolio__item"]}>
          <a
            href="https://github.com/i-lili/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["portfolio__link"]}
          >
            <h3 className={styles["portfolio__item-title"]}>Адаптивный сайт</h3>
            <img
              src={arrowImage}
              alt="Ссылка на проект Адаптивный сайт с изображением стрелки"
              className={styles["portfolio__link-arrow"]}
            />
          </a>
        </li>

        <li className={styles["portfolio__item"]}>
          <a
            href="https://github.com/i-lili/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["portfolio__link"]}
          >
            <h3 className={styles["portfolio__item-title"]}>
              Одностраничное приложение
            </h3>
            <img
              src={arrowImage}
              alt="Ссылка на проект Одностраничное приложение с изображением стрелки"
              className={styles["portfolio__link-arrow"]}
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
