const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { registerHelper } = require("hbs");
const geocode = require("./Utils/geocode");
const forecast = require("./Utils/forecast");

const app = express();
const port = process.env.PORT || 3000

//define paths for Express configuration
//__dirname is the folder directory this file currently lives in. Below 2 lines concatenate deeper folders to create new paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); //tell hbs where the partials directory is

//set up static directory to serve
app.use(express.static(publicDirectoryPath));


//app.get() takes in 2 params: 1st is route (partial URL), 2nd is function (what we want to do when this route is visited)
//within the second function, 1st param is the request, 2nd param is the response (what to send back)
// app.get("", (req, res) => {
//     res.send("<h1> Weather </h1>");
// });

// app.get("/help", (req, res) => {
//     res.send({
//         Name: "Steven",
//         Age: 24
//     });
// });

// app.get("/about", (req, res) => {
//     res.send("<h1> About Page </h1>");
// });

app.get("", (req,res) => {
    // first param is the view you want to render, second param is object with values you want the view to be able to access
    res.render("index", {
        title: "Weather",
        name: "Steven Chang"
    });
})

app.get("/about", (req, res) => {
    res.render("About", {
        title: "About Me",
        name: "Steven Chang"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This is the help page ",
        name: "Steven Chang"
    });
});

app.get("/weather", (req, res) => {
    //enforce an address is provided
    if (!req.query.address) {
        return res.send({
            error: "An address must be provided. Please try again."
        });
    }

    geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return res.send({
                error: "Unable to find location. Please try another search."
            });
        }
    
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: "Unable to get forecasts for this location."
                });
            }
    
            res.send({
                location: geocodeData.location,
                forecast: forecastData
            });
        });
    });

    
});

app.get("/products", (req, res) => {
    //enforce that search is populated
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

//match every page that hasn't been matched but also starts with /help
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        errorMessage: "Help article not found. ",
        name: "Steven Chang"
    });
});

//wildcard character: match anything that hasn't been matched so far
//THIS HAS TO COME LAST SO THAT ALL VALID ROUTES ARE EVALUATED FIRST
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found. ",
        name: "Steven Chang"
    });
});

//first param is port, second param is a callback function
app.listen(port, () => {
    console.log("Server is up on port " + port);
});