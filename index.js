const express = require('express');
const helmet = require('helmet');
const LambdaRouter = require('./data/lambda-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos',LambdaRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
