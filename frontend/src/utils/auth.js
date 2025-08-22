export const BASE_URL = "http://localhost:3001";

export const signUp = (email, password) => {
  const encodeURL = encodeURI(`${BASE_URL}/signup`);
  return fetch(encodeURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: encodeURI(email),
      password: encodeURI(password),
    }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(() => {
          if (res.status === 400) {
            throw new Error("Uno de los campos se rellenó de forma incorrecta");
          }
        });
  });
};

export const signIn = (email, password) => {
  const encodeURL = encodeURI(`${BASE_URL}/signin`);
  return fetch(encodeURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: encodeURI(email),
      password: encodeURI(password),
    }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(() => {
          if (res.status === 400) {
            throw new Error("No se ha proporcionado uno o más campos");
          } else if (res.status === 401) {
            throw new Error(
              "No se ha encontrado al usuario con el correo electrónico especificado"
            );
          }
        });
  });
};

export const getUser = (token) => {
  const encodeURL = encodeURI(`${BASE_URL}/users/me`);
  return fetch(encodeURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(() => {
          console.log(res);
          if (res.status === 400) {
            throw new Error(
              "Token no proporcionado o proporcionado en el formato incorrecto"
            );
          } else if (res.status === 401) {
            throw new Error("El token provisto es inválido");
          }
        });
  });
};
