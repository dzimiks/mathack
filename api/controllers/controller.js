var exports = module.exports = {}

exports.explore = function (req, res) {
    console.log(req.body.city);
    res.status(200).json({
        "message": "ovde je neka poruka"
    });
};



