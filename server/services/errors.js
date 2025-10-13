export class InvalidCredentialsError extends Error {
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message = 'User not found') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class EmailInUseError extends Error {
  constructor(message = 'Email already in use') {
    super(message);
    this.name = 'EmailInUseError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation error', errors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class AuthenticatedError extends Error {
  constructor(message = 'User is not authenticated') {
    super(message);
    this.name = 'AuthenticatedError';
  }
}
