import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { Sparkline } from './Sparkline';
import { AddToPortfolioModal } from './AddToPortfolioModal';
import type { Crypto } from '../types/crypto';

interface Props {
  crypto: Crypto;
}

export const CryptoCard: React.FC<Props> = ({ crypto }) => {
  const { watchlist, toggleWatchlist } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isWatchlisted = watchlist.includes(crypto.id);

  const handleWatchlistToggle = () => {
    toggleWatchlist(crypto.id);
    toast.success(
      isWatchlisted
        ? `${crypto.name} removed from watchlist`
        : `${crypto.name} added to watchlist`,
      {
        icon: isWatchlisted ? '💔' : '⭐',
        duration: 2000,
      }
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={crypto.image} alt={crypto.name} className="w-8 sm:w-10 h-8 sm:h-10" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {crypto.name}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase">
                {crypto.symbol}
              </span>
            </div>
          </div>
          <button
            onClick={handleWatchlistToggle}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                isWatchlisted
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
              ${crypto.current_price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">24h Change</span>
            <span
              className={`font-semibold text-sm sm:text-base ${
                crypto.price_change_percentage_24h >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Market Cap</span>
            <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
              ${crypto.market_cap.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4 h-16">
          <Sparkline data={crypto.sparkline_in_7d.price} />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          Add to Portfolio
        </button>
      </div>

      <AddToPortfolioModal
        crypto={crypto}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};