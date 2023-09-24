import React from "react";
import NavTab from "../NavTab/NavTab";
import styles from "./Promo.module.css";

// Компонент для отображения вводного раздела сайта
const Promo = () => {
  return (
    <section className={styles.promo}>
      <div className={styles.promo__content}>
        <h1 className={styles.promo__text}>
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
