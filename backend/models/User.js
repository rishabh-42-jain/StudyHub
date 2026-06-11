const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, // No two students can use the same email
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// This is a special trigger that encrypts the password right before it saves to the database!
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  // Scramble the password 10 times for security
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model('User', userSchema);