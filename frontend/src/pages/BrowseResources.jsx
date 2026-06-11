import React, { useState } from 'react';

// Mock data representing study materials at IIT Roorkee
const MOCK_RESOURCES = [
  { id: 1, title: 'MA-101: Calculus Lecture Notes', Tutorial: 'Notes', courseCode: 'MA-101', department: 'Mathematics', upvotes: 34, downloads: 120 },
  { id: 2, title: 'CY-101: General Chemistry Autumn 2024 End-Term Paper', Tutorial: 'PYQ', courseCode: 'CY-101', department: 'Chemistry', upvotes: 56, downloads: 240 },
  { id: 3, title: 'PH-101: Quantum Physics Question Bank', Tutorial: 'Books', courseCode: 'PH-101', department: 'Physics', upvotes: 22, downloads: 85 },
  { id: 4, title: 'EE-101: Basic Electrical Engineering Sheets', Tutorial: 'Notes', courseCode: 'EE-101', department: 'Electrical', upvotes: 45, downloads: 150 },
];

export default function BrowseResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.Tutorial === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      {/* Header Banner */}
      <header className="max-w-6xl mx-auto mb-10 text-center md:text-left md:flex md:items-center md:justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r select-none bg-blue-400 to-teal-400">
            StudyHub IIT Roorkee
          </h1>
          <p className="text-slate-400 mt-1">Academic Resource Repository</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by course code or title (e.g., MA-101)..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            {['All', 'Notes', 'PYQ', 'Books'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div key={resource.id} className="bg-slate-800/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-xl">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-700 text-blue-400 uppercase tracking-wider">
                    {resource.courseCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {resource.department}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-4 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer">
                  {resource.title}
                </h3>
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      👍 {resource.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      📥 {resource.downloads}
                    </span>
                  </div>
                  <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-500/20">
                    Download PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              No resources found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}