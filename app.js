const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');

const productsRouter = require('./routes/productsRouter');

const app = express();
app.use(bodyParser.json());

app.use(productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
