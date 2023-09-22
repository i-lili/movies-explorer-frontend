import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import styles from "./SavedMovies.module.css";

// Компонент для отображения сохраненных фильмов пользователя
function SavedMovies() {
  const isLoading = false;
  return (
    <main className={styles["saved-movies"]}>
      <SearchForm />

      {isLoading ? <Preloader /> : <MoviesCardList isSavedPage={true} />}
    </main>
  );
}

export default SavedMovies;
