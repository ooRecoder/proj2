function errorHandler(err, req, res, next) {
  console.error(err.stack); // log no terminal

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
}

module.exports = errorHandler;
