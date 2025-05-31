import React from 'react';
import Header from './components/Header';
import StatsSummary from './components/StatsSummary';
import RegionMap from './components/RegionMap';
import EngagementTags from './components/EngagementTags';
import CandidateTable from './components/CandidateTable';
import { candidates, regionStrengths, engagementTags, dashboardSummary } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Campaign Dashboard</h1>
        
        <StatsSummary summary={dashboardSummary} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RegionMap regionStrengths={regionStrengths} />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md h-full p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Insights</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h3 className="font-medium text-blue-800">Regional Focus</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    The West region shows the strongest campaign presence with an average engagement rate of 78%.
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <h3 className="font-medium text-amber-800">Areas for Improvement</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    The South region needs additional resources with only {regionStrengths[4].totalCandidates} candidate and {regionStrengths[4].overallStrength}% strength.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h3 className="font-medium text-green-800">Key Demographics</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Youth and urban voters show the highest engagement, consider focusing messaging on these groups.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                  <h3 className="font-medium text-purple-800">Campaign Strategy</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Consider recruiting additional candidates in unrepresented states to improve regional coverage.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-medium text-slate-800 mb-3">Party Distribution</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Progressive
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        50%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div style={{ width: "50%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                  
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                        Traditional
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-red-600">
                        33%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                    <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                  </div>
                  
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Centrist
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        17%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div style={{ width: "17%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <EngagementTags tags={engagementTags} />
        
        <CandidateTable candidates={candidates} />
      </main>
      
      <footer className="bg-slate-800 text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>Campaign Insights Dashboard | Data updated: May 15, 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;