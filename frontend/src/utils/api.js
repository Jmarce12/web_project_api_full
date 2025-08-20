class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserData() {
    const encodeURL = encodeURI(`${this.baseUrl}users/me`);
    return this._makeFetch(encodeURL, "GET", null);
  }

  setUserData(data) {
    const encodeURL = encodeURI(`${this.baseUrl}users/me`);
    return this._makeFetch(encodeURL, "PATCH", {
      name: data.name,
      about: data.about,
    });
  }

  editAvatar(data) {
    const encodeURL = encodeURI(`${this.baseUrl}users/me/avatar`);
    return this._makeFetch(encodeURL, "PATCH", {
      avatar: data.avatar,
    });
  }

  getInitialCards() {
    const encodeURL = encodeURI(`${this.baseUrl}cards`);
    return this._makeFetch(encodeURL, "GET");
  }

  addNewCard(data) {
    const encodeURL = encodeURI(`${this.baseUrl}cards`);
    return this._makeFetch(encodeURL, "POST", {
      name: data.name,
      link: data.link,
    });
  }

  deleteCard(cardId) {
    const encodeURL = encodeURI(`${this.baseUrl}cards/${cardId}`);
    return this._makeFetch(encodeURL, "DELETE", null);
  }

  cardLike(cardId, isLiked) {
    const encodeURL = encodeURI(`${this.baseUrl}cards/${cardId}/likes`);
    return this._makeFetch(encodeURL, isLiked ? "DELETE" : "PUT", null);
  }

  _makeFetch(url, method, body) {
    return fetch(url, {
      method: method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "811785a2-de15-4b25-a503-1867df4610d5",
    "Content-Type": "application/json",
  },
});
