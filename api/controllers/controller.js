// <<<<<<< Updated upstream
// var exports = module.exports = {};

// exports.explore = function (req, res) {
//   console.log(req.body.city);
//   res.status(200).json({
//     "path": [
//       {lat: 44.817186, lng: 20.560856},
//       {lat: 44.835186, lng: 20.530856},
//       {lat: 44.834186, lng: 20.460856},
//       {lat: 44.817186, lng: 20.560856},
//       {lat: 44.812186, lng: 20.560856},
//       {lat: 44.814186, lng: 20.560856},
//       {lat: 44.817186, lng: 20.560846},
//       {lat: 44.817186, lng: 20.530856},
//       {lat: 44.811184, lng: 20.560856},
//       {lat: 44.812183, lng: 20.530856},
//     ]
//   });
// =======
var exports = module.exports = {}
var googleMaps = require('./googleMaps');

exports.explore = function (req, res) {
    console.log(req.body.city);
    var places = googleMaps.findPlaces({ lat: 43.78344990000001, lng: 19.2934517 }, "school", function (places) {
        console.log(places);
        res.status(200).json({
            "path": places
        });
    });
};



