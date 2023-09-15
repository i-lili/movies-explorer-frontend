import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  // Хук состояния для проверки, вошел ли пользователь
  const [loggedIn, setLoggedIn] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);

  // Хук состояния для открытия или закрытия меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Используем useLocation для определения текущего маршрута
  const location = useLocation();

  useEffect(() => {
    // Каждый раз при смене маршрута закрываем меню
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className={styles.App}>
      <Routes>
        {/* Маршруты для регистрации и входа */}
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              {/* Шапка сайта для всех маршрутов, кроме регистрации и входа */}
              <Header
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              {/* Вложенные маршруты для основного контента */}
              <Routes>
                <Route index path="/" element={<Main />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />{" "}
              </Routes>
              {/* Показываем подвал на всех страницах, кроме профиля */}
              {location.pathname !== "/profile" && <Footer />}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
