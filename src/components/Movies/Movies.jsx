import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import styles from "./Movies.module.css";

function Movies({
  movies,
  isLoading,
  error,
  onSearch,
  hasSearched,
  query,
  setQuery,
  isShort,
  setIsShort,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) {
  return (
    <main className={styles.movies}>
      <SearchForm
        onSearch={onSearch}
        query={query}
        setQuery={setQuery}
        isShort={isShort}
        setIsShort={setIsShort}
      />

      {!hasSearched && isLoading && <Preloader />}
      {hasSearched && (
        <>
          {error && (
            <p>
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз.
            </p>
          )}
          {!isLoading && !error && movies.length === 0 && (
            <p>Ничего не найдено</p>
          )}
          {!isLoading && !error && movies.length > 0 && (
            <MoviesCardList
              movies={movies}
              isSavedPage={false}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              savedMovies={savedMovies}
            />
          )}
        </> 
      )}
    </main>
  );
}

export default Movies;
