require('dotenv').config();
const express = require('express');
const dataRouter = require('./routes/data-router');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/data', dataRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
