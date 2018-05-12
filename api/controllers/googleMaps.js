var exports = module.exports = {}

var googleMapsClient = require('@google/maps');

exports.findPlaces = function (location, type, fn) {
    googleMapsClient = googleMapsClient.createClient({
        key: 'AIzaSyCKF9usR1uRoBmIYxvQUO7DBt01rFyXH9A'
    });
    googleMapsClient.placesNearby({
        location: location,
        radius: 5000,
        type: type
    }, function (err, response) {
        if (!err) {
            let result = response.json.results;
            var places = [];
            result.forEach(element => {
                places.push(element.geometry.location);
            });
            fn(places);
        } else {
            console.log(err);
            return [];
        }
    });
};
