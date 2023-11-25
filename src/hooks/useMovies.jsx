import { useState, useCallback, useEffect } from "react";
import moviesApi from "../utils/MoviesApi";
import MainApi from "../utils/MainApi";
import { SHORT_MOVIE_DURATION } from "../constants/constants";

const useMovies = () => {
  // Состояния для хранения данных о фильмах, состояния загрузки, ошибок и флага поиска
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Состояния для сохраненных фильмов, поискового запроса и флага короткометражных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isShort, setIsShort] = useState(false);

  // Функция для получения сохраненных данных из локального хранилища
  const getSavedData = useCallback(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    const savedIsShort = JSON.parse(localStorage.getItem("isShort"));
    const savedSearch = JSON.parse(localStorage.getItem("savedSearch"));

    return { savedQuery, savedIsShort, savedSearch };
  }, []);

  // Пустой useCallback для загрузки фильмов
  const fetchMovies = useCallback(async () => {}, []);

  // Функция для поиска и фильтрации фильмов
  const handleSearch = async (query, isShort) => {
    setIsLoading(true);
    setError(null);

    if (!allMovies.length) {
      try {
        // Загрузка фильмов с сервера, если они еще не загружены
        const fetchedMovies = await moviesApi.getMovies();
        setAllMovies(fetchedMovies);
        localStorage.setItem("movies", JSON.stringify(fetchedMovies));
        performSearch(fetchedMovies, query, isShort);
      } catch (error) {
        setError("Ошибка при поиске фильмов");
        setIsLoading(false);
      }
    } else {
      // Поиск по уже загруженным фильмам
      performSearch(allMovies, query, isShort);
    }
  };

  // Функция для выполнения фильтрации фильмов
  const performSearch = (movies, query, isShort) => {
    let filteredMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );

    if (isShort) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= SHORT_MOVIE_DURATION
      );
    }

    setMovies(filteredMovies);
    setHasSearched(true);

    localStorage.setItem("searchQuery", query);
    localStorage.setItem("isShort", JSON.stringify(isShort));
    localStorage.setItem("savedSearch", JSON.stringify(filteredMovies));

    setIsLoading(false);
  };

  // Функция для сохранения фильма
  const handleSaveMovie = async (movie) => {
    try {
      // Подготовка данных о фильме для сохранения
      const movieData = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };

      // Сохранение фильма на сервере и в локальном хранилище
      const savedMovie = await MainApi.saveMovie(movieData);
      saveMovieToLocalStorage(savedMovie);
      setSavedMovies((prevMovies) => [...prevMovies, savedMovie]);
      console.log("Movie saved:", savedMovie);
    } catch (error) {
      setError("Ошибка при сохранении фильма");
    }
  };

  // Функция для удаления фильма
  const handleDeleteMovie = (movieId) => {
    console.log("Deleting movie with _id:", movieId);
    MainApi.deleteMovie(movieId)
      .then(() => {
        deleteMovieFromLocalStorage(movieId);
        const updatedSavedMovies = savedMovies.filter(
          (movie) => movie._id !== movieId
        );
        setSavedMovies(updatedSavedMovies);
      })
      .catch((error) => {
        setError(`Ошибка при удалении фильма: ${error.message}`);
      });
  };

  // Функция для сохранения фильма в локальное хранилище
  const saveMovieToLocalStorage = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    savedMovies.push(movie);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  };

  // Функция для удаления фильма из локального хранилища
  const deleteMovieFromLocalStorage = (movieId) => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const updatedSavedMovies = savedMovies.filter(
      (movie) => movie.movieId !== movieId
    );
    localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
  };

  // Функция для сброса списка всех фильмов
  const resetAllMovies = () => {
    setAllMovies([]);
  };

  // Загрузка сохраненных данных при инициализации компонента
  useEffect(() => {
    const { savedQuery, savedIsShort, savedSearch } = getSavedData();
    if (savedQuery !== null) setQuery(savedQuery);
    if (savedIsShort !== null) setIsShort(savedIsShort);

    if (localStorage.getItem("movies")) {
      const storedMovies = JSON.parse(localStorage.getItem("movies"));
      setAllMovies(storedMovies);
    }

    if (savedSearch !== null) {
      setMovies(savedSearch);
      setHasSearched(true);
    }
  }, [getSavedData]);

  return {
    allMovies,
    setAllMovies,
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    error,
    setError,
    hasSearched,
    setHasSearched,
    savedMovies,
    setSavedMovies,
    query,
    setQuery,
    isShort,
    setIsShort,
    fetchMovies,
    handleSearch,
    handleSaveMovie,
    handleDeleteMovie,
    saveMovieToLocalStorage,
    deleteMovieFromLocalStorage,
    resetAllMovies,
  };
};

export default useMovies;
