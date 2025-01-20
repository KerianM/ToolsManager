class CardValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CardValidationError';
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

class UserValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserValidationError';
  }
}

module.exports = {
  CardValidationError,
  DatabaseError,
  UserValidationError
};