const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const Caursel = require("../models/caursel");

exports.createCaursel = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuia");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new Caursel({
    title: title,
    image: image,
    body: body
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Caursel Item Succes",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.getAllCaursel = (req, res, next) => {

  Caursel.find()
    .then((result) => {
      res.status(200).json({
        message: "Data Caursel Berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateCaursel = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuia");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image Harus di Upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const caurselId = req.params.caurselId;

  Caursel.findById(caurselId)
    .then((post) => {
      if (!post) {
        const err = new Error("Caursel Tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.image = image;
      post.body = body;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Caursel Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCaursel = (req, res, next) => {
  const caurselId = req.params.caurselId;

  Caursel.findById(caurselId)
    .then((post) => {
      if (!post) {
        const err = new Error("Caursel Tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      removeImage(post.image);

      return Caursel.findByIdAndRemove(caurselId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Hapus Caursel",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filepath) => {
  filepath = path.join(__dirname, "../..", filepath);
  fs.unlink(filepath, (err) => console.log(err));
};
