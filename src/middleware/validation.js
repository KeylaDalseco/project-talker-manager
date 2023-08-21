const validEmail = (req, res, next) => {
  const { email } = req.body;
  const formatValid = /\S+@\S+\.\S+/;

  if (!email || email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!formatValid.test(email)) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
);
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
);
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === undefined) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
);
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
  return res.status(400).json(
    { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
);
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const validWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === undefined) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!isFormatDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const isValidRate = (rate) => Number.isInteger(rate) && rate >= 1 && rate <= 5;

const validRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!isValidRate(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = { validEmail,
  validPassword,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate };