const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { insertUsers } = require('../dao/userDao');
const { parseLineToObject, extractFields } = require('../utils/parser');
const calculateAgeDistribution = require('../utils/distribution');

const CSV_FILE_PATH = process.env.CSV_FILE_PATH;
const BATCH_SIZE = process.env.BATCH_SIZE || 1000;
const CONCURRENCY_LIMIT = process.env.CONCURRENCT_LIMIT || 3;

async function processUpload() {
    const fileStream = fs.createReadStream(path.resolve(CSV_FILE_PATH));
    const rl = readline.createInterface({ input: fileStream });

    let headers = [];
    let batch = [];
    let activeBatches = [];

    // Helper to handle batch queueing
    async function enqueueBatch(batch) {
        const promise = insertUsers(batch);
        activeBatches.push(promise);

        // Concurrency control
        if (activeBatches.length >= CONCURRENCY_LIMIT) {
            await Promise.all(activeBatches);
            activeBatches = [];
        }
    }

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
}

module.exports = processUpload;