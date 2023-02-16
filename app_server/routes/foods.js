const express = require('express');
const router = express.Router();
const controller = require('../controllers/food');

/* GET home page */
router.get('/', controller.food);

module.exports = router;