require('dotenv').config();
const express = require('express');
const uploadRouter = require('./routes/csv-upload');

const app = express();
const port = process.env.PORT || 3000;

app.use('/upload', uploadRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
