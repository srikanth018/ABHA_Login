const express = require("express");
// const mongoose = require("mongoose");
// const Router = require("./Routes/routes");
const dbconn = require("./Config/db")

const app = express();

app.use(express.json());
app.use(require("./Routes/Route"))

dbconn()


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
