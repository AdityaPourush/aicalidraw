const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/calculate', imageController.processImage);

module.exports = router;
