import Dashboard from './pages/Dashboard';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import BrowseResources from './pages/BrowseResources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UploadResource from './pages/UploadResource';
import ProtectedRoute from './components/ProtectedRoute';
// A temporary placeholder page for Upload
const PlaceholderPage = ({ title }) => (
  <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
    <h1 className="text-3xl font-bold text-slate-400">{title} Page Coming Soon...</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] flex flex-col">
        <Navbar />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
             <Route  path="/upload" element={<ProtectedRoute> <UploadResource />  </ProtectedRoute>}/> 
            
            {/* The new authentication routes! */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;