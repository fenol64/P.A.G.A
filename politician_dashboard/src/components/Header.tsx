import React from 'react';
import { BarChart3, Map, Users, Filter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <BarChart3 className="h-8 w-8 mr-3 text-blue-400" />
          <h1 className="text-2xl font-bold">Campaign Insights</h1>
        </div>
        
        <div className="flex space-x-1 md:space-x-4">
          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-md flex items-center transition-colors duration-200">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm md:text-base">Filters</span>
          </button>
          
          <div className="relative">
            <select className="appearance-none bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 pr-8 rounded-md text-sm md:text-base transition-colors duration-200">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Current Year</option>
              <option>All Time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 pr-8 rounded-md text-sm md:text-base transition-colors duration-200">
              <option>All Regions</option>
              <option>West</option>
              <option>Northeast</option>
              <option>Southeast</option>
              <option>Midwest</option>
              <option>South</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;