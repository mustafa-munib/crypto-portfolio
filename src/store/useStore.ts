import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioItem } from '../types/crypto';

interface Store {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  portfolio: PortfolioItem[];
  watchlist: string[];
  addToPortfolio: (item: PortfolioItem) => void;
  removeFromPortfolio: (id: string) => void;
  toggleWatchlist: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      portfolio: [],
      watchlist: [],
      addToPortfolio: (item) =>
        set((state) => {
          const existingItem = state.portfolio.find((p) => p.id === item.id);
          if (existingItem) {
            return {
              portfolio: state.portfolio.map((p) =>
                p.id === item.id
                  ? {
                      ...p,
                      amount: p.amount + item.amount,
                      purchasePrice:
                        (p.purchasePrice * p.amount + item.purchasePrice * item.amount) /
                        (p.amount + item.amount),
                    }
                  : p
              ),
            };
          }
          return {
            portfolio: [...state.portfolio, item],
          };
        }),
      removeFromPortfolio: (id) =>
        set((state) => ({
          portfolio: state.portfolio.filter((item) => item.id !== id),
        })),
      toggleWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.includes(id)
            ? state.watchlist.filter((item) => item !== id)
            : [...state.watchlist, id],
        })),
    }),
    {
      name: 'crypto-storage',
    }
  )
);