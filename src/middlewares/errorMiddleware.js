const errorMiddleware = (err, _req, res, _next) => {
  switch (err.name) {
    case 'UnauthorizedError':
      res.status(400).json({ message: err.message });
      break;
    case 'ValidationError':
      res.status(err.code).json({ message: err.message });
      break;
    case 'ConflictError':
      res.status(err.code).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: err.message });
  }
};

module.exports = errorMiddleware;