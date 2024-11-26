import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { Modal } from './Modal';
import type { Crypto } from '../types/crypto';

interface Props {
  crypto: Crypto;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToPortfolioModal: React.FC<Props> = ({ crypto, isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(crypto.current_price.toString());
  const addToPortfolio = useStore((state) => state.addToPortfolio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const numPrice = parseFloat(purchasePrice);

    if (numAmount > 0 && numPrice > 0) {
      addToPortfolio({
        id: crypto.id,
        amount: numAmount,
        purchasePrice: numPrice,
      });
      toast.success(`Added ${numAmount} ${crypto.symbol.toUpperCase()} to portfolio`, {
        icon: '💰',
        duration: 3000,
      });
      onClose();
      setAmount('');
      setPurchasePrice(crypto.current_price.toString());
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add ${crypto.name} to Portfolio`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="any"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-2 text-gray-500 dark:text-gray-400">
              {crypto.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Purchase Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
            <input
              type="number"
              id="price"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              min="0"
              step="any"
              required
              className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Add to Portfolio
          </button>
        </div>
      </form>
    </Modal>
  );
};