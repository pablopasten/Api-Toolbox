const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const v1=require("./src/v1/routes/index");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use("/files/data/",v1);

// manejo de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});


const server= app.listen(PORT, () => {
  console.log(`servidor corriendo en: ${PORT}`);
});

module.exports = server;