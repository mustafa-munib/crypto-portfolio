import React from 'react';
import { useStore } from '../store/useStore';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PortfolioItemProps {
  id: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  name: string;
  symbol: string;
  image: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  id,
  amount,
  purchasePrice,
  currentPrice,
  name,
  symbol,
  image,
}) => {
  const removeFromPortfolio = useStore((state) => state.removeFromPortfolio);
  const totalValue = amount * currentPrice;
  const initialValue = amount * purchasePrice;
  const profitLoss = totalValue - initialValue;
  const profitLossPercentage = ((totalValue - initialValue) / initialValue) * 100;

  const handleRemove = () => {
    removeFromPortfolio(id);
    toast.success(`Removed ${name} from portfolio`, {
      icon: '🗑️',
      duration: 2000,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={image} alt={name} className="w-8 h-8" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">{symbol}</span>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          aria-label={`Remove ${name} from portfolio`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {amount.toLocaleString()} {symbol.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Purchase Price:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${purchasePrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Current Price:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${currentPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total Value:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Profit/Loss:</span>
          <span
            className={`font-medium ${
              profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            ${profitLoss.toLocaleString()} ({profitLossPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export const PortfolioView: React.FC<{ cryptos: any[] }> = ({ cryptos }) => {
  const portfolio = useStore((state) => state.portfolio);
  const totalPortfolioValue = portfolio.reduce((total, item) => {
    const crypto = cryptos.find((c) => c.id === item.id);
    if (crypto) {
      return total + item.amount * crypto.current_price;
    }
    return total;
  }, 0);

  const totalInitialValue = portfolio.reduce((total, item) => {
    return total + item.amount * item.purchasePrice;
  }, 0);

  const totalProfitLoss = totalPortfolioValue - totalInitialValue;
  const totalProfitLossPercentage = ((totalPortfolioValue - totalInitialValue) / totalInitialValue) * 100;

  if (portfolio.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          Your portfolio is empty. Add some cryptocurrencies to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total Value:</span>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalPortfolioValue.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total Profit/Loss:</span>
            <p
              className={`text-2xl font-bold ${
                totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              ${totalProfitLoss.toLocaleString()} ({totalProfitLossPercentage.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((item) => {
          const crypto = cryptos.find((c) => c.id === item.id);
          if (!crypto) return null;
          return (
            <PortfolioItem
              key={item.id}
              id={item.id}
              amount={item.amount}
              purchasePrice={item.purchasePrice}
              currentPrice={crypto.current_price}
              name={crypto.name}
              symbol={crypto.symbol}
              image={crypto.image}
            />
          );
        })}
      </div>
    </div>
  );
};