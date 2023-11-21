class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl; 
    this._headers = options.headers; 
  }

  setAuthToken(token) {
    this._headers.Authorization = `Bearer ${token}`; 
  }

  async _getJson(res) {
    if (res.ok) {
      return await res.json(); 
    }
    throw new Error(`Ошибка: ${res.status}`); 
  }

  // Регистрация пользователя
  async register(data) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._getJson(res);
  }

  // Вход пользователя
  async login(data) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._getJson(res);
  }

  // Получение информации о пользователе
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Редактирование информации о пользователе
  async editUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._getJson(res);
  }

  // Проверка валидности токена
  async checkToken() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Получение сохраненных фильмов пользователя
  async getSavedMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    });
    return this._getJson(res);
  }

  // Сохранение фильма
  async saveMovie(data) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._getJson(res);
  }

  // Удаление фильма
  async deleteMovie(movieId) {
    const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._getJson(res);
  }
}

// Создание экземпляра класса MainApi с передачей базового URL и заголовков
const mainApi = new MainApi({
  baseUrl: "https://moviesdiploma.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
  },
});

export default mainApi;
