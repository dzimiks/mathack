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
            console.log('error');
            fn(err, null);
        }
    });
};

exports.findDistanceMatrix = function (origins, destinations, fn) {
    console.log(origins);
    googleMapsClient.distanceMatrix({
        origins: origins,
        destinations: destinations
    }, function (err, res) {
        console.log(res.json.rows[0].elements[1].duration.value);
        if (!err) {
            let matrix = new Array(origins.length);
            for (let i = 0; i < origins.length; i++) {
                matrix[i] = new Array(destinations.length);
            }
            for (let i = 0; i < origins.length; i++) {
                for (let j = 0; j < destinations.length; j++) {
                    matrix[i][j] = res.json.rows[i].elements[j].duration.value;
                }
            }
            console.log("dosao");
            console.log(matrix);
            fn(err, matrix);
        } else {
            console.log('error');
            fn(err, null);
        }
    });
};
