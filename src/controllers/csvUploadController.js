const processUpload = require('../services/uploadService');

const csvUploadController = async (req, res) => {
    try {
        await processUpload();
        res.status(200).send('File processed and data uploaded successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing file.');
    }
}

module.exports = csvUploadController;