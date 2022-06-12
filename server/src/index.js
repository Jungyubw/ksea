const express = require("express");
const mongoose = require("mongoose");
const api = require("./api");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/ksea", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api", api);

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});