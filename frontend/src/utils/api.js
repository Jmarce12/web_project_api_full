import { getToken } from "./token";

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
    const token = getToken();
    const headers = {
      ...this.headers,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(url, {
      method: method,
      headers: headers,
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
  baseUrl: "https://api.wpaf.chickenkiller.com/",
  // baseUrl: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});
