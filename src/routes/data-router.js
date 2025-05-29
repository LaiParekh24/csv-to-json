const express = require('express');
const router = express.Router();
const dataProcessController = require('../controllers/data-process-controller');

router.post('/process', dataProcessController);

module.exports = router;
