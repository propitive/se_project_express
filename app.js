const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", (r) => {
  console.log("connected to DB", r);
});

const routes = require("./routes");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/user");

app.use(express.json());
app.use(cors());
app.use(routes);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
