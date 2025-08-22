class HandleErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function WentWrongError(message) {
  return new HandleErrors(message, 400);
}

export function WrongAuthError(message) {
  return new HandleErrors(message, 401);
}

export function UnauthorizedError(message) {
  return new HandleErrors(message, 403);
}

export function NotFoundError(message) {
  return new HandleErrors(message, 404);
}

export function ServerError(message) {
  return new HandleErrors(message, 500);
}
