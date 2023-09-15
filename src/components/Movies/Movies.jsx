import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import styles from "./Movies.module.css";

// Компонент Movies отображает страницу с фильмами
function Movies({ movies, isLoading }) {
  return (
    <section className={styles.movies}>
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
    </section>
  );
}

export default Movies;