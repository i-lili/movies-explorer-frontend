import React from "react";
import styles from "./AboutProject.module.css";

const AboutProject = () => {
  return (
    <section id="project" className={styles.aboutProject}>
      <h2 className={styles.aboutProject__title}>О проекте</h2>
      <article className={styles.aboutProject__description}>
        <div className={styles.aboutProject__descriptionGrid}>
          <h3
            className={`${styles.aboutProject__subtitle} ${styles.aboutProject__stage1}`}
          >
            Дипломный проект включал 5 этапов
          </h3>
          <h3
            className={`${styles.aboutProject__subtitle} ${styles.aboutProject__stage2}`}
          >
            На выполнение диплома ушло 5 недель
          </h3>
          <p
            className={`${styles.aboutProject__text} ${styles.aboutProject__info1}`}
          >
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p
            className={`${styles.aboutProject__text} ${styles.aboutProject__info2}`}
          >
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className={styles.aboutProject__timelineGrid}>
          <time
            className={`${styles.aboutProject__time} ${styles.aboutProject__timeBackground1}`}
          >
            1 неделя
          </time>
          <time
            className={`${styles.aboutProject__time} ${styles.aboutProject__timeBackground4}`}
          >
            4 недели
          </time>
          <p className={styles.aboutProject__stage}>Back-end</p>
          <p className={styles.aboutProject__stage}>Front-end</p>
        </div>
      </article>
    </section>
  );
};

export default AboutProject;
