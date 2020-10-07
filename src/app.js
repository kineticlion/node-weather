const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/mapbox");
const { forecast } = require("./utils/weatherstack");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
hbs.registerHelper("equal", function (lvalue, rvalue, options) {
  if (lvalue != rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sufiyan Saboowala",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sufiyan Saboowala",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help section",
    title: "Help",
    name: "Sufiyan Saboowala",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address)
    return res.send({
      error: "You must provide an address",
    });

  //gets latitude and longitude for fetching weather
  geocode(address, (error, data) => {
    if (error) return res.send({ error });
    //gets forecast at the latitude and longitude
    forecast(data.latitude, data.longitude, data.location, (error, data) => {
      if (error) return res.send({ error });
      console.log(data);
      res.send({
        data,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You must provide a search string.",
    });
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article does not exist!.",
    title: "Help",
    name: "Sufiyan Saboowala",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Error 404 Page does not exist.",
    title: "Error",
    name: "Sufiyan Saboowala",
  });
});

app.listen(3000, (req, res) => {
  console.log(`Server started at http://localhost:3000 !`);
});
