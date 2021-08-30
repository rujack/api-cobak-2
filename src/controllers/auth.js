const { validationResult } = require("express-validator");
const User = require("../models/auth");

exports.Register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuia");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const { nama, email, password } = req.body;

  const Register = new User({
    nama: nama,
    email: email,
    password: password,
  });

  Register.save()
    .then((result) => {
      res.status(201).json({
        message: "Register Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.Login = (req, res, next) => {
  const { email, password } = req.body;
};
