const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.get('/', (req,res) => {
    res.send("On route /api")
})
router.post('/calculate', imageController.processImage);

module.exports = router;
