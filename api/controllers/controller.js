var exports = module.exports = {}
var googleMaps = require('./googleMaps');
var unique = require('array-unique');

exports.explore = function (req, res) {
    let sportTypes = ['stadium', 'park'];
    let nightLifeTypes = ['bar', 'night_club', 'restaurant', 'cafe'];
    let historicalTypes = ['art_gallery', 'church', 'museum', 'synagogue', 'mosque', 'fortress'];
    let natureTypes = ['campground', 'zoo', 'park', 'river'];

    let sportPlaces = [];
    let nightlifePlaces = [];
    let historicalPlaces = [];
    let naturePlaces = [];
    let result = [];
    let cnt = 0;
    for (let i = 0; i < sportTypes.length; i++) {
        googleMaps.findPlaces(req.body.city, sportTypes[i], function (err, places) {
            if (err) {
                console.log(err);
            } else {
                sportPlaces = sportPlaces.concat(places);
            }
            cnt++;
            if (cnt === sportTypes.length) {
                sportPlaces = unique(sportPlaces);
                cnt = 0;
                for (let i = 0; i < nightLifeTypes.length; i++) {
                    googleMaps.findPlaces(req.body.city, nightLifeTypes[i], function (err, places) {
                        if (err) {
                            console.log(err);
                        } else {
                            nightlifePlaces = nightlifePlaces.concat(places);
                        }
                        cnt++;
                        if (cnt === nightLifeTypes.length) {
                            nightlifePlaces = unique(nightlifePlaces);
                            cnt = 0;
                            for (let i = 0; i < historicalTypes.length; i++) {
                                googleMaps.findPlaces(req.body.city, historicalTypes[i], function (err, places) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        historicalPlaces = historicalPlaces.concat(places);
                                    }
                                    cnt++;
                                    if (cnt === historicalTypes.length) {
                                        historicalPlaces = unique(historicalPlaces);
                                        cnt = 0;
                                        for (let i = 0; i < natureTypes.length; i++) {
                                            googleMaps.findPlaces(req.body.city, natureTypes[i], function (err, places) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    naturePlaces = naturePlaces.concat(places);
                                                }
                                                cnt++;
                                                if (cnt === natureTypes.length) {
                                                    naturePlaces = unique(naturePlaces);

                                                    let finalResult = exports.predict(req, sportPlaces, historicalPlaces, naturePlaces, nightlifePlaces);
                                                    res.status(200).json({
                                                        "path": finalResult
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

};

exports.predict = function(req, sportPlaces, historicPlaces, naturePlaces, nightlifePlaces) {
    let centroid = {
        sport: parseFloat(req.body.sportWeight),
        historical: parseFloat(req.body.historicalWeight),
        nightlife: parseFloat(req.body.nightlifeWeight),
        nature: parseFloat(req.body.natureWeight)
    };
    for (let i = 0; i < nightlifePlaces.length; i++) {
        nightlifePlaces[i].rating *= centroid.nightlife;
        if (nightlifePlaces[i] === NaN) {
            nightlifePlaces[i] = 0;
        }
    }
    for (let i = 0; i < sportPlaces.length; i++) {
        sportPlaces[i].rating *= centroid.sport;
        if (sportPlaces[i] === NaN) {
            sportPlaces[i] = 0;
        }
    }
    for (let i = 0; i < historicPlaces.length; i++) {
        historicPlaces[i].rating *= centroid.historical;
        if (historicPlaces[i] === NaN) {
            historicPlaces[i] = 0;
        }
    }
    for (let i = 0; i < naturePlaces.length; i++) {
        naturePlaces[i].rating *= centroid.nature;
        if (naturePlaces[i] === NaN) {
            naturePlaces[i] = 0;
        }
    }
    let result = nightlifePlaces.concat(sportPlaces.concat(historicPlaces.concat(naturePlaces)));
    result.sort(function(a, b){return b.rating-a.rating});
    result = result.splice(0, 10);
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].location;
    }

    googleMaps.findDistanceMatrix(result, result, function(err, matrix) {
        if (err) {
            console.log(err);
        } else {
            console.log(matrix);
        }
    });

    return result;
}
