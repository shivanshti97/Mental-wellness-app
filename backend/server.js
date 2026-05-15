const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const personalRoutes = require('./routes/personalRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Routes
app.use('/api', personalRoutes);

// Root
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Mental Wellness API',
    status: 'running',
    endpoints: {
      'POST /api/add': 'Add document',
      'GET /api/all': 'Get all documents',
      'GET /api/:id': 'Get by ID',
      'DELETE /api/:id': 'Delete by ID',
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Collection: ${process.env.COLLECTION_NAME}`);
});

module.exports = app;
