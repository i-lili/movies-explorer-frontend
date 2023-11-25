import React, { useState, useEffect, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import styles from "./SavedMovies.module.css";
import { SHORT_MOVIE_DURATION } from "../../constants/constants";

function SavedMovies({ savedMovies, onDeleteMovie }) {
  // Состояния для хранения запроса поиска, флага короткометражных фильмов,
  // и фильтрованных сохраненных фильмов
  const [query, setQuery] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shouldFilter, setShouldFilter] = useState(false);

  // Функция для фильтрации сохраненных фильмов
  const filterMovies = useCallback(() => {
    const filtered = savedMovies.filter((movie) => {
      const matchesQuery =
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase());
      const isShortMovie = movie.duration <= SHORT_MOVIE_DURATION;
      return matchesQuery && (isShort ? isShortMovie : true);
    });
    setFilteredMovies(filtered);
  }, [savedMovies, query, isShort]);

  // Установка начальных фильмов при загрузке компонента
  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  // Фильтрация фильмов при изменении запроса, флага короткометражных фильмов
  // или при добавлении/удалении фильмов
  useEffect(() => {
    if (shouldFilter || savedMovies.length !== filteredMovies.length) {
      filterMovies();
    }
    setShouldFilter(false);
  }, [filterMovies, shouldFilter, savedMovies, filteredMovies.length]);

  // Обработчик поиска фильмов
  const handleSearch = (searchQuery, shortFilter) => {
    setQuery(searchQuery);
    setIsShort(shortFilter);
    setShouldFilter(true);
  };

  return (
    <main className={styles["saved-movies"]}>
      <SearchForm
        onSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      <MoviesCardList
        movies={filteredMovies}
        isSavedPage={true}
        onDeleteMovie={onDeleteMovie}
        showMoreButton={false}
      />
    </main>
  );
}

export default SavedMovies;
