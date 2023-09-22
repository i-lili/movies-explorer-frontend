import React from "react";
import styles from "./Techs.module.css";

// Компонент, описывающий технологии, используемые в проекте
const Techs = () => {
  return (
    <section id="technology" className={styles.techs}>
      {/* Заголовок раздела */}
      <h2 className={styles.techs__title}>Технологии</h2>

      {/* Подзаголовок указывает на количество технологий */}
      <h3 className={styles.techs__subtitle}>7 технологий</h3>

      {/* Описание раздела */}
      <p className={styles.techs__description}>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>

      {/* Список технологий, используемых в проекте */}
      <ul className={styles.techs__list}>
        {["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"].map(
          (tech) => (
            // Элемент списка с названием технологии
            <li key={tech} className={styles.techs__item}>
              {tech}
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default Techs;
