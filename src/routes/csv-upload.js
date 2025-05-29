const express = require('express');
const router = express.Router();
const csvUploadController = require('../controllers/csvUploadController');

router.post('/csv-upload', csvUploadController);

module.exports = router;
