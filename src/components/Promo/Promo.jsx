import React from "react";
import styles from "./Promo.module.css";

// Компонент для отображения вводного раздела сайта
const Promo = () => {
  return (
    <section className={styles.promo}>
      <h1 className={styles.promo__text}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
};

export default Promo;
