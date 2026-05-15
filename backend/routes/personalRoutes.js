const express = require('express');
const PersonalModel = require('../models/PersonalModel');

const router = express.Router();

// POST /api/add
router.post('/add', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }
    const doc = await new PersonalModel({ title, description }).save();
    res.status(201).json({ success: true, message: 'Document added successfully', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding document', error: error.message });
  }
});

// GET /api/all
router.get('/all', async (req, res) => {
  try {
    const docs = await PersonalModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching documents', error: error.message });
  }
});

// GET /api/:id
router.get('/:id', async (req, res) => {
  try {
    const doc = await PersonalModel.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching document', error: error.message });
  }
});

// DELETE /api/:id
router.delete('/:id', async (req, res) => {
  try {
    const doc = await PersonalModel.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting document', error: error.message });
  }
});

module.exports = router;
