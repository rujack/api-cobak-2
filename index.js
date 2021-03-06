const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");
const caurselRoutes = require("./src/routes/caursel");

let PORT = process.env.PORT || 4000;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
);

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PUT,PATCH,OPTIONS",
  );
  res.append("Access-Control-Allow-HEaders", "Content-Type,Authorization");
  next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);
app.use("/v1/caursel", caurselRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://sandal:sandal123@cluster0.hgual.mongodb.net/Data?retryWrites=true&w=majority",
  )
  .then(() => {
    app.listen(PORT, () => console.log("Connection berhasil"));
  })
  .catch((err) => console.log(err));
