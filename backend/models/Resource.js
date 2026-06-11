const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  
  // --- NEW FIELDS WE JUST ADDED ---
  courseName: { type: String, required: true },
  department: { type: String, required: true },
  materialType: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);