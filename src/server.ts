import * as express from "express";
// const express = require('express');
const app = express();

app.get('/', function (_req, res) {
  res.send('Hello World7!');
});

const port = process.env.PORT || 3000;;
app.listen(port, function () {
  console.log('listening on port ' + port);
});