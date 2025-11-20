class CepPromiseError extends Error {
  constructor(message, type) {
    super(message);
    this.name = 'CepPromiseError';
    this.type = type || 'unknown_error';
  }
}

module.exports = CepPromiseError;