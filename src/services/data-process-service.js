const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { insertUsers } = require('../dao/user-dao');
const { parseLineToObject, extractFields } = require('../utils/parser');
const calculateAgeDistribution = require('../utils/distribution');
const { FileNotFoundError, AppError } = require('../exceptions/exception-types');

const CSV_FILE_PATH = process.env.CSV_FILE_PATH;
const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const CONCURRENCY_LIMIT = process.env.CONCURRENCT_LIMIT || 3;

async function processData() {
    const filePath = path.resolve(CSV_FILE_PATH);

    if (!fs.existsSync(filePath)) {
        throw new FileNotFoundError(filePath);
    }

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    let headers = [];
    let batch = [];
    let activeBatches = [];

    async function enqueueBatch(batch) {
        const promise = insertUsers(batch);
        activeBatches.push(promise);

        if (activeBatches.length >= CONCURRENCY_LIMIT) {
            await Promise.all(activeBatches);
            activeBatches = [];
        }
    }

    try {
        for await (const line of rl) {
            if (!headers.length) {
                headers = line.split(',').map(h => h.trim());
                continue;
            }
            const nestedObj = parseLineToObject(headers, line);
            const userObj = extractFields(nestedObj);
            batch.push(userObj);

            if (batch.length >= BATCH_SIZE) {
                await enqueueBatch(batch);
                batch = [];
            }
        }

        if (batch.length > 0) {
            await enqueueBatch(batch);
        }

        if (activeBatches.length > 0) {
            await Promise.all(activeBatches);
        }

        await calculateAgeDistribution();
    } catch (error) {
        rl.close();
        fileStream.destroy();
        throw new AppError('Unexpected error occured');
    }
}

module.exports = processData;