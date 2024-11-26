import React from 'react';
import { Moon, Sun, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                CryptoTracker
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                by Mustafa Hussaini
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};