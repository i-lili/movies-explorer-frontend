import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useMovies from "../../hooks/useMovies";
import MainApi from "../../utils/MainApi";
import styles from "./App.module.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Состояния для управления логином, меню, и текущим пользователем
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Используем хуки и функции из useMovies для управления фильмами
  const {
    movies,
    setMovies,
    isLoading,
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
    allMovies,
    setAllMovies,
    resetAllMovies,
  } = useMovies();

  // Массивы для определения, когда отображать Header и Footer
  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  // Функция для получения данных текущего пользователя
  const fetchCurrentUser = useCallback(async () => {
    try {
      const userData = await MainApi.getUserInfo();
      setCurrentUser(userData);
    } catch (error) {
      setError(`Ошибка при получении данных пользователя: ${error.message}`);
    }
  }, [setError]);

  // Функции для регистрации и входа пользователя
  const handleRegister = async (name, email, password) => {
    try {
      const response = await MainApi.register({ name, email, password });
      handleAuthResponse(response);
    } catch (error) {
      setError(`Ошибка при регистрации пользователя: ${error.message}`);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await MainApi.login({ email, password });
      handleAuthResponse(response);
    } catch (error) {
      setError(`Ошибка при входе пользователя: ${error.message}`);
    }
  };

  // Функция для обработки ответа сервера после регистрации или входа
  const handleAuthResponse = async (response) => {
    if (response.token) {
      localStorage.setItem("jwt", response.token);
      MainApi.setAuthToken(response.token);
      try {
        const userData = await MainApi.getUserInfo();
        setCurrentUser(userData);
        setLoggedIn(true);
        navigate("/movies");
      } catch (error) {
        setError("Ошибка при получении данных пользователя");
      }
    } else {
      setError("Неожиданный ответ сервера.");
    }
  };

  // Функция для обновления данных пользователя
  const handleUpdateUser = async (name, email) => {
    try {
      const updatedUser = await MainApi.editUserInfo({ name, email });
      setCurrentUser(updatedUser);
    } catch (error) {
      setError(`Ошибка при обновлении профиля: ${error.message}`);
    }
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    localStorage.clear();

    resetAllMovies();

    setQuery("");
    setIsShort(false);
    setMovies([]);
    setHasSearched(false);
    setCurrentUser({});
    setLoggedIn(false);

    setAllMovies([]);

    navigate("/");
  };

  // Эффекты для получения данных текущего пользователя и фильмов
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      MainApi.setAuthToken(jwtToken);
      fetchCurrentUser();
      MainApi.getSavedMovies()
        .then((savedMoviesData) => {
          setSavedMovies(savedMoviesData);
        })
        .catch(() => {
          setError("Ошибка при получении сохраненных фильмов");
        });
    }
  }, [fetchCurrentUser, loggedIn, setSavedMovies, setError]);

  useEffect(() => {
    if (loggedIn && allMovies.length === 0) {
      fetchMovies();
    }
  }, [loggedIn, allMovies, fetchMovies]);

  // Закрыть меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={styles.App}>
        {headerRoutes.includes(location.pathname) && (
          <Header
            loggedIn={loggedIn}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}

        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<Main />} index />

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  movies={movies}
                  isLoading={isLoading}
                  error={error}
                  onSearch={handleSearch}
                  hasSearched={hasSearched}
                  query={query}
                  setQuery={setQuery}
                  isShort={isShort}
                  setIsShort={setIsShort}
                  onSaveMovie={handleSaveMovie}
                  onDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  savedMovies={savedMovies}
                  onDeleteMovie={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateUser}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        {footerRoutes.includes(location.pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
