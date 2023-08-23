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

const server= app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;