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
app.use("/api", api);

app.listen(port, () => {
  console.log("Server is up on port:" + port);
});