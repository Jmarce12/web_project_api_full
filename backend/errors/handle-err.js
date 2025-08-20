class HandleErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const WentWrongError = (message) => new HandleErrors(message, 400);

export const WrongAuthError = (message) => new HandleErrors(message, 401);

export const UnauthorizedError = (message) => new HandleErrors(message, 403);

export const NotFoundError = (message) => new HandleErrors(message, 404);

export const ServerError = (message) => new HandleErrors(message, 500);
