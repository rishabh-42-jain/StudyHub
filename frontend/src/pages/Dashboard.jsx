import { FileText, Download, User, Clock, Search, BookOpen, Layers, Tag, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const currentUser = localStorage.getItem('userName');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track what the user types in the search bar
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('https://studyhub-tzcr.onrender.com/api/upload/all');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    // 1. Ask for confirmation so they don't accidentally click it
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      // 2. Tell the Node.js backend to delete it from MongoDB
      await axios.delete(`https://studyhub-tzcr.onrender.com/api/upload/${id}`);
      
      // 3. Remove it from the screen immediately without refreshing the page
      setResources(resources.filter(file => file._id !== id));
      
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Is the backend running?');
    }
  };
  
  // NEW: Live filtering logic
  // This looks at the search term and filters the array BEFORE we draw the cards
  const filteredResources = resources.filter((file) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (file.fileName && file.fileName.toLowerCase().includes(searchLower)) ||
      (file.courseName && file.courseName.toLowerCase().includes(searchLower)) ||
      (file.department && file.department.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-xl text-blue-400 animate-pulse">Loading resources...</div>
      </div>
    );
  }

 return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 font-sans">
      
      {/* Bright & Inviting Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 mb-2">
            Resource Library
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Discover and share knowledge with the community.
          </p>
        </div>
        
        {/* Soft Search Bar */}
        <div className="relative w-full md:w-[400px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-slate-800 placeholder-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center shadow-sm">
          <div className="p-4 bg-indigo-50 rounded-full mb-4">
            <FileText className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-xl text-slate-800 font-semibold">Library is empty</h3>
          <p className="text-slate-500 mt-2 max-w-sm">Be the first to contribute to the collective knowledge base.</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No matching resources found.</p>
        </div>
      ) : (
        /* The Floating Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((file) => (
            <div key={file._id} className="group bg-white border border-slate-100 rounded-3xl p-6 hover:border-indigo-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col relative overflow-hidden">
              
              {/* Subtle accent gradient line at the top of the card */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-violet-400 group-hover:via-indigo-400 group-hover:to-purple-400 transition-all duration-500 opacity-50"></div>

              <div className="flex items-start gap-4 mb-5 pt-1">
                <div className="p-3 bg-violet-50 rounded-2xl shrink-0 group-hover:bg-violet-100 transition-colors">
                  <FileText className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-slate-800 truncate tracking-tight" title={file.fileName}>
                    {file.fileName}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1 font-medium">
                    <User className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span className="truncate">{file.uploadedBy || 'Anonymous'}</span>
                  </div>
                </div>
              </div>

              {/* Colorful & Interesting Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {file.courseName && (
                  <span className="flex items-center text-xs font-semibold tracking-wide bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100/50">
                    {file.courseName}
                  </span>
                )}
                {file.department && (
                  <span className="flex items-center text-xs font-semibold tracking-wide bg-rose-50 text-rose-700 px-3 py-1 rounded-lg border border-rose-100/50">
                    {file.department}
                  </span>
                )}
              </div>
              
              {/* Clean Footer */}
              <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {new Date(file.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})} 
                </div>
                
                <div className="flex items-center gap-2">
                  {file.uploadedBy === currentUser && (
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete File"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Vibrant Primary Button */}
                  <a 
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}