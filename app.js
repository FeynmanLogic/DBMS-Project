const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const exphbs = require("express-handlebars"); // Import express-handlebars

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: "root",
  password: "param1903",
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
console.log(__dirname);
app.use(express.static(publicDirectory));

//to parse url encoded bodies as sent by HTML forms
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Register and configure Handlebars as the view engine
// app.engine("hbs", exphbs({ extname: "hbs" }));
app.set("view engine", "hbs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected successfully");
  }
});

// app.get("/", (req, res) => {
//   //   res.send("<h1>Home page</h1>");
//   res.render("index");
// });

// app.get("/register", (req, res) => {
//   //   res.send("<h1>Home page</h1>");
//   res.render("register");
// });

app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("listening from port 5000");
});
