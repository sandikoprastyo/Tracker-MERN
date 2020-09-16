const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
/* server || port */
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
/* database */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

/* connect monggo */
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("MonggoDb database connection established successfully");
});

/* impor router */
const exercisesRouter = require("./routers/exercises");
const usersRouter = require("./routers/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
