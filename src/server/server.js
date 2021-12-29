const express = require("express");
const app = express();
const cors = require("cors");

//SERVER PORT
const port = 3001;

const apiRouter = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("HELLO from SERVER HOME PAGE");
});

app.use((err, req, res, next) => {
  res.send(err, "ERROR IN USERNAME/EMAIL");
});

//SERVER IS LISTENINGc
app.listen(port, (req, res) => {
  console.log(`SERVER IS STARTED ON PORT ${port}`);
});
