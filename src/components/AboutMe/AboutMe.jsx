import React from "react";
import styles from "./AboutMe.module.css";
import profileIcon from "../../images/about-me-image.svg";

const AboutMe = () => {
  return (
    <section id="student" className={styles.aboutMe}>
      <h2 className={styles.aboutMe__title}>Студент</h2>
      <div className={styles.aboutMe__content}>
        <div className={styles.aboutMe__text}>
          <h3 className={styles.aboutMe__name}>Виталий</h3>
          <p className={styles.aboutMe__subtitle}>
            Фронтенд-разработчик, 30 лет
          </p>
          <p className={styles.aboutMe__description}>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/i-lili"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutMe__link}
          >
            Github
          </a>
        </div>
        <img
          src={profileIcon}
          alt="Profile"
          className={styles.aboutMe__image}
        />
      </div>
    </section>
  );
};

export default AboutMe;
