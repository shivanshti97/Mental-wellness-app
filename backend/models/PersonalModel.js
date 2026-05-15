const mongoose = require('mongoose');
require('dotenv').config();

const personalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const collectionName = process.env.COLLECTION_NAME || 'shivansh_collection';
const PersonalModel = mongoose.model('Personal', personalSchema, collectionName);

module.exports = PersonalModel;
