const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const users_router = require("./routes/users_router");
const products_router = require("./routes/products_router");
const carts_router = require("./routes/carts_router");
const orders_router = require("./routes/orders_router");
const categories_router = require("./routes/categories_router");


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CSRF TOKEN
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173","http://localhost:5174"],
    optionsSuccessStatus: 200,
  })
);

app.use('/users', users_router);
app.use('/products', products_router);
app.use('/carts', carts_router);
app.use('/orders', orders_router);
app.use('/categories', categories_router);


module.exports = app;
