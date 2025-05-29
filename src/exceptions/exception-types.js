class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class FileNotFoundError extends AppError {
    constructor(filePath) {
        super(`File not found: ${filePath}`, 404);
    }
}

class DataNotFoundError extends AppError {
    constructor(data) {
        super(`Data not found`, 404);
    }
}

class DatabaseInsertError extends AppError {
    constructor(reason) {
        super(`Error inserting to database: ${reason}`, 500);
    }
}

module.exports = {
    AppError,
    FileNotFoundError,
    DataNotFoundError,
    DatabaseInsertError
};
