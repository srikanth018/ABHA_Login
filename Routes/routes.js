const express = require("express");
const Fest = require("../Model/models");

const router = express.Router()
const { register } = require("../Controller/Auth")
router.route("/register").post(register)

const app = express();

app.post("/add-fest", async (request, response) => {
  const user = new Fest(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/view-fest", async (request, response) => {
  const users = await Fest.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = app;