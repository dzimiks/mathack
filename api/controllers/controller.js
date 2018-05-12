var exports = module.exports = {};

exports.explore = function (req, res) {
  console.log(req.body.city);
  res.status(200).json({
    "path": [
      {lat: 44.817186, lng: 20.560856},
      {lat: 44.835186, lng: 20.530856},
      {lat: 44.834186, lng: 20.460856},
      {lat: 44.817186, lng: 20.560856},
      {lat: 44.812186, lng: 20.560856},
      {lat: 44.814186, lng: 20.560856},
      {lat: 44.817186, lng: 20.560846},
      {lat: 44.817186, lng: 20.530856},
      {lat: 44.811184, lng: 20.560856},
      {lat: 44.812183, lng: 20.530856},
    ]
  });
};



