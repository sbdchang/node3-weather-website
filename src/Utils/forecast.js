const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=71997715b4e228b6bde6e0a2e6e5230e&query=" + latitude + "," + 
                    longitude + "&units=f";
    
    request({url: url, json: true}, (error, response) => {
        if (error) {
            //error occurred, data is undefined
            callback("Unable to connect to weather services.", undefined);
        } else if (response.body.error) {
            callback("Unable to get weather for this location.", undefined);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + 
                                " degrees out. It feels like " + response.body.current.feelslike + " degrees out.");
        }
    })                
}

module.exports = forecast;