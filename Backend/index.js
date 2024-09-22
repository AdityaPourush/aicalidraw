const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const imageRoutes = require('./src/routes/imageRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api', imageRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send(`Server running on port ${PORT}`));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
