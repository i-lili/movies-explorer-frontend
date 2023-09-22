import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1); // Перемещение на одну страницу назад
  };

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__code}>404</h1>
      <p className={styles.notFound__description}>Страница не найдена</p>
      <button onClick={goBackHandler} className={styles.notFound__backLink}>
        Назад
      </button>
    </div>
  );
}

export default NotFound;
