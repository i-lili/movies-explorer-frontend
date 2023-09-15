import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Название проекта */}
      <p className={styles["footer__project-name"]}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={styles["footer__content"]}>
        {/* Год */}
        <time className={styles["footer__year"]}>&copy; 2023</time>
        <nav>
          {/* Список ссылок в подвале */}
          <ul className={styles["footer__links-list"]}>
            {/* Ссылка на Яндекс.Практикум */}
            <li className={styles["footer__link-item"]}>
              <a
                href="https://praktikum.yandex.ru/"
                className={styles["footer__link"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            {/* Ссылка на Github */}
            <li className={styles["footer__link-item"]}>
              <a
                href="https://github.com/"
                className={styles["footer__link"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
