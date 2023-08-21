module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const tokenIsValid = typeof authorization === 'string' && authorization.length === 16;
  if (!tokenIsValid) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};