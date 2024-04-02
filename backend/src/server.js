require("dotenv").config(); // .env file support for configuration
const express = require("express");
const cors = require("cors");
const app = express();
const weatherRouter = require("./routes/weatherRouter");

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRouter);

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening on port 8000")
);
