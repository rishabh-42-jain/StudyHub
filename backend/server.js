require('dotenv').config(); // Loads your .env variables
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// 1. Initialize Express
const app = express();

// 2. Connect to MongoDB
connectDB();

// 3. Apply Middlewares (Security and Data parsing)
app.use(helmet()); // Protects against common web vulnerabilities
app.use(cors());
app.use(express.json()); // Allows the server to understand JSON data

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));
// Upload Route
app.use('/api/upload', require('./routes/uploadRoutes'));

// 4. Create a test route so we know it works
app.get('/', (req, res) => {
  res.send('StudyHub API is running smoothly!');
});

// 5. Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is actively running on port ${PORT}`);
});