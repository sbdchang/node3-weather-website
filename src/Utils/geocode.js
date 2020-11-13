const request = require("request");

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3RldmVuY2hhbmc5NiIsImEiOiJja2Z4NnBrbHcxNmthMnRuNG54bW8weTBiIn0.vbYg6tPamLxSnmqOEvEo9Q&limit=1";

    request({url: url, json: true}, (error, response) => {
        if (error) {
            //error occurred, data is undefined
            callback("Unable to connect to location services.", undefined);
        } else if (response.body.features.length === 0) {
            //error occurred, data is undefined
            callback("Unable to geocode location. Try another search.", undefined);
        } else {
            //no error. error is undefined
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;