const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const { login, createUser } = require("./controllers/user");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r);
});

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

// app.post("/signup", createUser);
// app.post("/signin", login);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
