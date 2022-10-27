const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "635a5cb072c43e1a51a6a5bc", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use((req, res) => {
  res.status(404).send({ message: "Некорректный путь запроса" });
});

app.listen(PORT, () => {
  console.log(PORT);
});
