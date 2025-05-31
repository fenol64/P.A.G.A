import React from 'react';
import { DashboardSummary } from '../types/types';
import { Users, Map, BarChart, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';

interface StatsSummaryProps {
  summary: DashboardSummary;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform duration-200 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Total Candidates</h3>
          <div className="p-2 bg-blue-100 rounded-md">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-slate-800">{summary.totalCandidates}</span>
          <span className="ml-2 text-green-500 flex items-center text-sm">
            <ChevronUp className="h-4 w-4 mr-1" />
            <span>+8% from last month</span>
          </span>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform duration-200 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Geographic Coverage</h3>
          <div className="p-2 bg-indigo-100 rounded-md">
            <Map className="h-5 w-5 text-indigo-600" />
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-slate-800">{summary.totalStates}</span>
          <span className="text-lg text-slate-600 ml-1">states</span>
          <span className="ml-2 text-slate-600 text-sm">
            in {summary.totalRegions} regions
          </span>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="font-medium mr-2">Strongest region:</span>
          <span className="text-blue-600">{summary.strongestRegion}</span>
          <span className="mx-2">|</span>
          <span className="font-medium mr-2">Weakest region:</span>
          <span className="text-amber-600">{summary.weakestRegion}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform duration-200 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Average Engagement Rate</h3>
          <div className="p-2 bg-green-100 rounded-md">
            <BarChart className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-slate-800">{summary.avgEngagementRate}%</span>
          <span className="ml-2 text-amber-500 flex items-center text-sm">
            <ChevronDown className="h-4 w-4 mr-1" />
            <span>-2% from last month</span>
          </span>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          Most engaged demographics:
          <div className="flex flex-wrap gap-2 mt-2">
            {summary.topTags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col transition-transform duration-200 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Growth Trajectory</h3>
          <div className="p-2 bg-purple-100 rounded-md">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-slate-800">+12.6%</span>
          <span className="ml-2 text-green-500 flex items-center text-sm">
            <ChevronUp className="h-4 w-4 mr-1" />
            <span>+5.2% above projection</span>
          </span>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-1">
            {[32, 45, 39, 53, 48, 62, 72].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-full bg-purple-200 rounded-sm" 
                  style={{ height: `${value}px` }}
                >
                  <div 
                    className="bg-purple-500 w-full rounded-sm transition-all duration-500" 
                    style={{ height: `${value}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;