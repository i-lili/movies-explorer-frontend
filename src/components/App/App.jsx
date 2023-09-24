import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./App.module.css";

function App() {
  // Хук состояния для отслеживания статуса входа пользователя
  const [loggedIn, setLoggedIn] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);

  // Хук состояния для управления отображением меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Хук для получения текущего пути из браузера
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Здесь будет код для выхода из аккаунта...

    // Перенаправление пользователя на главную страницу
    navigate("/");
  };

  // Сброс состояния меню при изменении пути
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Массив путей, где должен отображаться Header
  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];
  // Массив путей, где должен отображаться Footer
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  return (
    <div className={styles.App}>
      {/* Отображение Header только на определенных маршрутах */}
      {headerRoutes.includes(location.pathname) && (
        <Header
          loggedIn={loggedIn}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}

      {/* Основные маршруты приложения */}
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} index />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>

      {/* Отображение Footer только на определенных маршрутах */}
      {footerRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
