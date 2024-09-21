require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const db = require('./database/db'); // MySQL setup
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Importing the auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/auth', authRoutes); // Mounting the authentication routes

// Health check endpoint
app.get('/health', (req, res) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      console.error('Error performing health check query:', err);
      res.status(500).send('Database connection error');
    } else {
      res.status(200).send('Database connected successfully');
    }
  });
});

/*
app.use((req, res) => {
  return res.status(404).json({message: "Route not found"});
})
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
