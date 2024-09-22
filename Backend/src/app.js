const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', imageRoutes);

module.exports = app;
