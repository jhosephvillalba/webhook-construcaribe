const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
// const { verifySignature } = require("./helper/verify_token");
// const xhub = require('express-x-hub');
const cors = require('cors'); 


const indexRouter = require("./routes/index");
const webhook = require("./routes/webhook");

const app = express();

// view engine setup
app.use(cors());

//app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_TOKEN }));


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use((req, res, next) => {
//   const buf = Buffer.from(JSON.stringify(req.body), "utf-8");

//   if (!verifySignature(req, res, buf)) {
//     return res.status(403).send("Invalid signature.");
//   }

//   next();
// });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/webhook", webhook);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
