class AppError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }
}

class NotAuthorized extends Error {
  constructor(message) {
    super(message);

    this.status = 401;
  }
}

module.exports = { AppError, NotAuthorized };
