const express = require("express");
const { PORT = 3000 } = process.env;
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mestodb");



app.use("/users", require("./routes/users"));

app.use("/cards", require("./routes/cards"));

app.use((req, res, next) => {
  req.user = {
    _id: "635a5cb072c43e1a51a6a5bc", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  console.log(PORT);
});