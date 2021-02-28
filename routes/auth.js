const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    let userPassword = req.body.password;
    let hashPassword = user.password;

    const validPassword = await bcrypt.compare(userPassword, hashPassword);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");

    res.send(token);
  } catch (err) {
    console.log(err);
  }
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

module.exports = router;
