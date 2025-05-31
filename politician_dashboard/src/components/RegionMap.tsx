import React, { useState } from 'react';
import { RegionStrength } from '../types/types';
import { Map } from 'lucide-react';

interface RegionMapProps {
  regionStrengths: RegionStrength[];
}

const RegionMap: React.FC<RegionMapProps> = ({ regionStrengths }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('West');
  const currentRegion = regionStrengths.find(r => r.region === selectedRegion) || regionStrengths[0];
  
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Regional Campaign Strength</h2>
          <div className="flex items-center space-x-2">
            <Map className="h-5 w-5 text-slate-500" />
            <select 
              className="text-sm border border-slate-300 rounded-md p-1"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regionStrengths.map(region => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="aspect-video bg-slate-100 rounded-lg p-4 relative flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {currentRegion.states.map((state) => (
                  <div 
                    key={state.state} 
                    className="relative p-4 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center"
                    style={{ backgroundColor: state.color }}
                  >
                    <span className="text-xl font-bold text-white">{state.abbreviation}</span>
                    <span className="text-xs text-white/90 mt-1">{state.strength}%</span>
                    {state.candidates > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {state.candidates}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-slate-600">
                * Strength based on polling and engagement metrics
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="h-full flex flex-col">
              <h3 className="font-medium text-lg mb-4">{selectedRegion} Region Insights</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Total Strength</span>
                  <span className="font-medium">{currentRegion.overallStrength}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${currentRegion.overallStrength}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-600 mb-2">State Breakdown</h4>
                <div className="space-y-2">
                  {currentRegion.states.map(state => (
                    <div key={state.state} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-sm mr-2" 
                          style={{ backgroundColor: state.color }}
                        ></div>
                        <span className="text-sm">{state.state}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{state.strength}%</span>
                        <span className="text-xs text-slate-500">
                          ({state.candidates} candidate{state.candidates !== 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-600 mb-2">Recommendations</h4>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Focus resources on {currentRegion.states[currentRegion.states.length - 1].state} to improve regional coverage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Increase candidate recruitment in unrepresented states</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Direct {currentRegion.overallStrength < 70 ? 'youth engagement' : 'senior outreach'} programs across the region</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionMap;