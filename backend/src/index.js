const express = require('express');
const cors = require('cors');
const routes = require('./routes'); /* o ./ é para indicar que é um arquivo, senão entenderia que é uma dependência */

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Rota/recurso
 * 
 */

/**
 * Métodos HTTP
 * 
 * GET: busca/lista informações no backend
 * POST: cria uma informação no back
 * PUT: edita uma informação no back
 * DELETE: duplo twist carpado
 */

 /**
  * Tipos de parâmetros
  * 
  * Query params: parâmetros nomeados enviados na rota depois do "?"
  * Route params: parâmetros utilizados para identificar recursos
  * Request body: corpo da requisição, utilizado para criar ou alterar recursos
  */

/**
 * Principais bancos de dados
 * 
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB
 */

 /**
  * Formas de comunicar com o banco de dados
  * 
  * Driver: SELECT * FROM users
  * Query builder: table('users').select('*').where...
  * 
  */



app.listen(3333);
