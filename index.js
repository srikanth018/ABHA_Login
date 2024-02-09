// const express = require("express");
// // const mongoose = require("mongoose");
// // const Router = require("./Routes/routes");
// const dbconn = require("./Config/db")

// const app = express();

// app.use(express.json());
// app.use(require("./Routes/Route"))

// dbconn()


// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });

const express = require("express");
const db = require("./Config/db"); // Import the MySQL connection
const app = express();

app.use(express.json());
app.use(require("./Routes/Route"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// If you need to perform some actions after connecting to the database, you can do it here
db.on('connect', () => {
  console.log('Connected to MySQL database');
});
