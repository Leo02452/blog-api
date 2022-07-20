const errorMiddleware = (err, _req, res, _next) => {
  const { code, message } = err;
  res.status(code || 500).json({ message });
};

module.exports = errorMiddleware;