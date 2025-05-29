const { AppError } = require('../exceptions/exception-types');
const processData = require('../services/data-process-service');

const dataProcessController = async (req, res) => {
    try {
        await processData();
        res.status(200).send('File processed and data uploaded successfully.');
    } catch (err) {
        const status = err instanceof AppError ? err.statusCode : 500;
        res.status(status).send(err.message || 'Unexpected error occurred.');
    }
}

module.exports = dataProcessController;