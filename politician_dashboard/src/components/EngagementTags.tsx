import React, { useState } from 'react';
import { EngagementTag } from '../types/types';
import { Tags, ChevronUp, ChevronDown } from 'lucide-react';

interface EngagementTagsProps {
  tags: EngagementTag[];
}

const EngagementTags: React.FC<EngagementTagsProps> = ({ tags }) => {
  const [sortBy, setSortBy] = useState<'count' | 'percentage'>('percentage');
  const [expanded, setExpanded] = useState(false);
  
  const sortedTags = [...tags].sort((a, b) => b[sortBy] - a[sortBy]);
  const displayTags = expanded ? sortedTags : sortedTags.slice(0, 8);
  
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Tags className="h-5 w-5 text-slate-700 mr-2" />
            <h2 className="text-xl font-bold text-slate-800">Demographic Engagement</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select 
              className="text-sm border border-slate-300 rounded-md p-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'count' | 'percentage')}
            >
              <option value="percentage">Engagement %</option>
              <option value="count">Count</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {displayTags.map((tag) => (
            <div 
              key={tag.name}
              className="rounded-lg border border-slate-200 p-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium">{tag.name}</h3>
                <div 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                >
                  {tag.count} candidates
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Engagement</span>
                  <span>{tag.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ width: `${tag.percentage}%`, backgroundColor: tag.color }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Base: {tag.count} candidates</span>
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: tag.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {tags.length > 8 && (
          <button 
            className="w-full mt-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-md flex items-center justify-center hover:bg-slate-50 transition-colors duration-200"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show All Tags
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default EngagementTags;