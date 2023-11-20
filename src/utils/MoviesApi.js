class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl; 
    this._headers = options.headers; 
  }

  async _getJson(res) {
    if (res.ok) {
      return await res.json(); // Получение JSON-данных из ответа
    }
    throw new Error(`Ошибка: ${res.status}`); // Генерация ошибки при неуспешном запросе
  }

  // Получение списка фильмов
  async getMovies() {
    const res = await fetch(this._baseUrl, {
      headers: this._headers,
    });
    return this._getJson(res);
  }
}

// Создание экземпляра класса MoviesApi с передачей базового URL и заголовков
const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
