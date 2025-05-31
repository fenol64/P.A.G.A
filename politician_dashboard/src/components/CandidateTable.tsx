import React, { useState } from 'react';
import { Candidate } from '../types/types';
import { ChevronDown, ChevronUp, Search, Users } from 'lucide-react';

interface CandidateTableProps {
  candidates: Candidate[];
}

const CandidateTable: React.FC<CandidateTableProps> = ({ candidates }) => {
  const [sortField, setSortField] = useState<keyof Candidate>('engagementRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSort = (field: keyof Candidate) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const getSortIcon = (field: keyof Candidate) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-slate-700 mr-2" />
            <h2 className="text-xl font-bold text-slate-800">Candidate List</h2>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search candidates..."
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('name')}
                >
                  Candidate
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('party')}
                >
                  Party
                  {getSortIcon('party')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('region')}
                >
                  Region
                  {getSortIcon('region')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('state')}
                >
                  State
                  {getSortIcon('state')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('supporters')}
                >
                  Supporters
                  {getSortIcon('supporters')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('engagementRate')}
                >
                  Engagement
                  {getSortIcon('engagementRate')}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-500">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-900">{candidate.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      candidate.party === 'Progressive' 
                        ? 'bg-blue-100 text-blue-800' 
                        : candidate.party === 'Traditional'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {candidate.party}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{candidate.region}</td>
                <td className="py-3 px-4 text-slate-600">{candidate.state}</td>
                <td className="py-3 px-4 text-slate-600">
                  {new Intl.NumberFormat('en-US').format(candidate.supporters)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-full max-w-[80px] bg-slate-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          candidate.engagementRate >= 75 
                            ? 'bg-green-500' 
                            : candidate.engagementRate >= 65 
                              ? 'bg-amber-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${candidate.engagementRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{candidate.engagementRate}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                        {tag}
                      </span>
                    ))}
                    {candidate.tags.length > 2 && (
                      <span className="px-2 py-1 bg-slate-200 rounded-full text-xs text-slate-600">
                        +{candidate.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-200 text-sm text-slate-500 text-center">
        Showing {sortedCandidates.length} of {candidates.length} candidates
      </div>
    </div>
  );
};

export default CandidateTable;