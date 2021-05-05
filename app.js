if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

const Product = require("./models/product");
const data = require("./data/data");
const ExpressError = require("./utils/expressError");

// data.forEach((item) => {
//   const newProduct = new Product(item);
//   newProduct.save();
// });
mongoose.connect("mongodb://localhost:27017/elixir", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/products", async (req, res, next) => {
  const products = await Product.find({});

  res.render("products", { products });
});

app.get("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const products = await Product.find({});
    if (!product) {
      throw new ExpressError("Sorry find the page you're after :(", 404);
    } else if (product) {
      const rand = [];
      while (rand.length < 3) {
        const r = Math.floor(Math.random() * 8);
        if (rand.indexOf(r) === -1) rand.push(r);
      }
      res.render("product", { product, products, rand });
    }
  } catch (e) {
    if (e.name === "CastError") {
      return next(new ExpressError("Can't find the page you're after", 404));
    }
    next(e);
  }
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Uh oh, something went wrong", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
