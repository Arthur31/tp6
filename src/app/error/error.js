class AppError extends Error {
  constructor(type, message) {
    super(message || type && type.description);
    this.type = type;
  }
}

class AppErrorType {
  constructor(httpCode, description) {
    this.httpCode = httpCode;
    this.description = description;
  }
}

const AppErrorTypes = {
  DTO_INVALID_FORMAT: new AppErrorType(400, 'DTO format is invalid'),
  PARAMETER_INVALID_FORMAT: new AppErrorType(400, 'Parameter format is invalid'),
  NOT_AUTHENTICATED: new AppErrorType(401, 'User must be authenticated'),
  RESOURCE_NOT_FOUND: new AppErrorType(404, 'Resource has not been found'),
  OTHER_ERROR: new AppErrorType(500, 'Other error')
};

module.exports = {
  AppError,
  AppErrorTypes
};
