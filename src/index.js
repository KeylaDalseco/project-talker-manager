const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const talkerRouter = require('./routes/talkerRoutes');

const app = express();
app.use(express.json());
app.use('/login', loginRouter);
app.use('/talker', talkerRouter);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// iniciando o projeto

app.listen(PORT, () => {
  console.log('Online');
});
