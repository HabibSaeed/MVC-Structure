const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const router = require("./routes");

//Body Parsers MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB_URI = `mongodb+srv://habibsaeed:habibsaeed@cluster0.diosgkh.mongodb.net/`;
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));
app.use(router);

app.get("/", (req, res) => {
  res.json({
    message: "SERVER UP",
  });
});

app.listen(PORT, () => {
  console.log(`Server Is Running On http://localhost:${PORT}`);
});
