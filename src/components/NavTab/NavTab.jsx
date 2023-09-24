import React from "react";
import styles from "./NavTab.module.css";

// Компонент NavTab для навигации по разделам страницы
const NavTab = () => {
  return (
    <nav className={styles.navtab}>
      <ul className={styles.navtab__list}>
        <li className={styles.navtab__item}>
          <a href="#project" className={styles.navtab__link}>
            О проекте
          </a>
        </li>
        <li className={styles.navtab__item}>
          <a href="#technology" className={styles.navtab__link}>
            Технологии
          </a>
        </li>
        <li className={styles.navtab__item}>
          <a href="#student" className={styles.navtab__link}>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
