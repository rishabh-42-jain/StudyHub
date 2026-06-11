import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, File } from 'lucide-react';

export default function UploadResource() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // NEW: State for our labels
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [materialType, setMaterialType] = useState('Lecture Notes');

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile || !courseName) {
      alert("Please select a file and enter a course name!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userName', localStorage.getItem('userName') || 'Anonymous Student');
    
    // NEW: Stuffing the labels into our envelope
    formData.append('courseName', courseName);
    formData.append('department', department);
    formData.append('materialType', materialType);

    try {
      const response = await axios.post('https://studyhub-tzcr.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('Success! File and details saved.');
      
      // Clear the form after success
      setSelectedFile(null); 
      setCourseName('');
      
    } catch (error) {
      console.error('Upload Failed:', error);
      alert('Failed to upload file. Is the backend running?');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <UploadCloud className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Upload a Resource</h2>
          <p className="text-slate-400">Share study materials with your peers.</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-5">
          
          {/* File Input Box */}
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 hover:border-blue-500 transition-colors bg-slate-900/50 text-center">
            <input 
              type="file" 
              className="hidden" 
              id="fileInput"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
              <File className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-slate-300 font-medium hover:text-blue-400 transition-colors">
                {selectedFile ? selectedFile.name : "Click to browse files"}
              </span>
            </label>
          </div>

          {/* NEW: Course Details Form */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Course Code/Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g., CS-101 or Data Structures"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Material Type</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              >
                <option value="Lecture Notes">Lecture Notes</option>
                <option value="Past Papers">Past Papers</option>
                <option value="Assignments">Assignments</option>
                <option value="Books">Books</option>
              </select>
            </div>
          </div>

          {/* Upload Button */}
          <button 
            type="submit"
            disabled={isUploading}
            className={`w-full font-semibold py-3 px-4 mt-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
              isUploading 
                ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
            }`}
          >
            {isUploading ? 'Uploading & Saving...' : 'Upload Resource'}
          </button>
          
        </form>
      </div>
    </div>
  );
}