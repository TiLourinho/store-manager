const express = require('express');
const bodyParser = require('body-parser');
const { STATUS_INTERNAL_SERVER_ERROR } = require('./utils/statusCodes');

const productsRouter = require('./routes/productsRouter');

const app = express();
app.use(bodyParser.json());

app.use(productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
