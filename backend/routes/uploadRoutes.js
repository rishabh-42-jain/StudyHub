const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Resource = require('../models/Resource');

// 1. Give Cloudinary our secret keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Tell Multer to temporarily hold the file in the server's memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. The actual upload pathway
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was received' });
    }

  // Convert the file from memory into a raw data string
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Grab the actual file extension from the uploaded file (e.g., 'pdf', 'png')
    const fileExtension = req.file.originalname.split('.').pop();

    // Send it to the warehouse with the exact format attached!
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto', 
      folder: 'studyhub_resources',
      format: fileExtension // <--- This forces the link to end in .pdf or .jpg!
    });

    // Save the record to MongoDB
    const newResource = await Resource.create({
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      uploadedBy: req.body.userName || 'Anonymous Student',
      courseName: req.body.courseName,       // Catching the course
      department: req.body.department,       // Catching the dept
      materialType: req.body.materialType    // Catching the type
    });

    // Cloudinary responds with a permanent, secure URL
    res.json({
      message: 'File uploaded successfully',
      fileUrl: result.secure_url
    });
    
  } catch (error) {
    console.error("🔥 CLOUDINARY CRASH DETAILS:", error);
    res.status(500).json({ message: `System Error: ${error.message}` });
  }
});

// Get all uploaded resources
router.get('/all', async (req, res) => {
  try {
    // You'll eventually want a Resource model, but for now 
    // let's just query a collection if you've been saving them!
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

// DELETE a resource
router.delete('/:id', async (req, res) => {
  try {
    // Find the file in the database by its ID and delete it
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    
    if (!deletedResource) {
      return res.status(404).json({ message: 'File not found in database' });
    }

    res.json({ message: 'File successfully deleted!' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: 'Server error while deleting' });
  }
});

module.exports = router;