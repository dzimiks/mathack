var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

// explore
router.post('/explore', controller.explore);


module.exports = router;