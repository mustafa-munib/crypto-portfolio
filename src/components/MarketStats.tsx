import React from 'react';
import { TrendingUp, DollarSign, BarChart2 } from 'lucide-react';

interface MarketStatsProps {
  stats: {
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
  };
}

export const MarketStats: React.FC<MarketStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <DollarSign className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${(stats.total_market_cap / 1e12).toFixed(2)}T
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <BarChart2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${(stats.total_volume / 1e9).toFixed(2)}B
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap Change 24h</p>
            <p
              className={`text-xl font-bold ${
                stats.market_cap_change_percentage_24h >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {stats.market_cap_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};