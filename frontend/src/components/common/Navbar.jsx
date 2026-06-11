import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, LogOut, UploadCloud, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // We use this so the Navbar "wakes up" and checks the token every time the page changes
  const location = useLocation(); 

  // Check if the user has a digital ID badge in their browser
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // 1. Destroy the digital ID badges
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    
    // 2. Teleport them back to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-extrabold text-slate-800">StudyHub</span>
          </Link>

          {/* Right Side: Dynamic Buttons */}
          <div className="flex items-center gap-4">
            {token ? (
              // IF LOGGED IN: Show Dashboard, Upload, and Logout
              <>
               <Link to="/" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold px-3 py-2 transition-all">
                  Dashboard
                </Link>
                <Link to="/upload" className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold px-3 py-2 transition-all">
                  <UploadCloud className="h-4 w-4" /> Upload
                </Link>
                
                {/* Divider Line */}
                <div className="h-6 w-px bg-slate-700 mx-2"></div>
                
                {/* User Profile & Logout */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full text-sm font-medium">
                    <User className="h-4 w-4" />
                    {userName || 'Student'}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              </>
            ) : (
              // IF LOGGED OUT: Show Login and Signup
              <>
                <Link to="/login" className="text-slate-300 hover:text-white font-medium px-3 py-2 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                  Create Account
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}