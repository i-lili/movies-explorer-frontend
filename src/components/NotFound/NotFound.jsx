import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <div className={styles.notFound}>
        <h1 className={styles.notFound__code}>404</h1>
        <p className={styles.notFound__description}>Страница не найдена</p>
      </div>
      <a className={styles.notFound__backLink} href="/">
        Назад
      </a>
    </>
  );
}

export default NotFound;
