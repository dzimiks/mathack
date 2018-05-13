var exports = module.exports = {}

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyACesQpuNYcjMJX2x4WGY4CaLD1AKBFtqs'
});

exports.findPlaces = function (city, type, fn) {
    googleMapsClient.geocode({
        address: city
    }, function (err, res) {
        if (!err) {
            googleMapsClient.placesNearby({
                location: res.json.results[0].geometry.location,
                radius: 4000,
                type: type
            }, function (err, response) {
                if (!err) {
                    let result = response.json.results;
                    var places = [];
                    for (let i = 0; i < result.length; i++) {
                        let element = result[i];
                        places.push({location: element.geometry.location, types: element.types, rating: element.rating});
                    }
                    fn(null, places);
                } else {
                    fn(err, null);
                }
            });
        } else {
            fn(err, null);
        }
    });
};
