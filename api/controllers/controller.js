var exports = module.exports = {}

exports.explore = function (req, res) {
    console.log(req.body.city);
    res.status(200).json({
        "path": [{lat: 82.0012, lng: 13.314}, {lat: -52.123, lng: 13.341}]
    });
};



