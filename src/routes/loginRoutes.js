const express = require('express');
const generateToken = require('../utils/cripto');
const { validEmail, validPassword } = require('../middleware/validation');
// const { readFile } = require('../utils/talker');

const loginRouter = express.Router();

loginRouter.post('/', validEmail, validPassword, async (req, res) => {
  try {
    const token = generateToken();

    if (!token) return res.status(401).json({ message: 'Token inválido' });

    res.status(200).json({ token });    
  } catch (error) {
    console.error({ message: 'Não é possível inserir um talker.' });
  }
});

module.exports = loginRouter;