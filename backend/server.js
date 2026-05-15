const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const personalRoutes = require('./routes/personalRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', personalRoutes);

// Root health check
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Mental Wellness API is running',
    status: 'ok',
    collection: process.env.COLLECTION_NAME || 'shivansh_collection',
    endpoints: {
      'POST /api/add': 'Add a document',
      'GET  /api/all': 'Get all documents',
      'GET  /api/:id': 'Get document by ID',
      'DELETE /api/:id': 'Delete document by ID',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// Only listen locally — Vercel handles this in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Collection: ${process.env.COLLECTION_NAME}`);
    console.log(`\n📝 Endpoints:`);
    console.log(`   POST   http://localhost:${PORT}/api/add`);
    console.log(`   GET    http://localhost:${PORT}/api/all\n`);
  });
}

// Export for Vercel serverless
module.exports = app;
