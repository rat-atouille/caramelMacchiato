require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/db');
//const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());

const PORT = process.env.PORT  || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

// Health check endpoint
app.get('/health', (req, res) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      console.error('Error performing health check query:', err);
      res.status(500).send('Database connection error');
    } else {
      res.status(200).send('Database connected successfully ');
    }
  });
});

///app.use('/api/auth', authRoutes);
