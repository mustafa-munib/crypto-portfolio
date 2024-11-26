import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CryptoCard } from './components/CryptoCard';
import { PortfolioView } from './components/PortfolioView';
import { MarketStats } from './components/MarketStats';
import { useStore } from './store/useStore';
import type { Crypto } from './types/crypto';

function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'market' | 'portfolio'>('market');
  const theme = useStore((state) => state.theme);
  const [marketStats, setMarketStats] = useState({
    total_market_cap: 0,
    total_volume: 0,
    market_cap_change_percentage_24h: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoResponse, globalResponse] = await Promise.all([
          fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true'
          ),
          fetch('https://api.coingecko.com/api/v3/global'),
        ]);

        const cryptoData = await cryptoResponse.json();
        const globalData = await globalResponse.json();

        setCryptos(cryptoData);
        setMarketStats({
          total_market_cap: globalData.data.total_market_cap.usd,
          total_volume: globalData.data.total_volume.usd,
          market_cap_change_percentage_24h: globalData.data.market_cap_change_percentage_24h_usd,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Toaster position="top-right" />
        <Header />
        <Hero />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <MarketStats stats={marketStats} />

          <div className="flex space-x-4 mb-6 mt-8">
            <button
              onClick={() => setActiveTab('market')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'market'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'portfolio'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Portfolio
            </button>
          </div>

          {activeTab === 'market' && (
            <>
              <div className="mb-6 sm:mb-8">
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                />
              </div>

              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Loading cryptocurrencies...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCryptos.map((crypto) => (
                    <CryptoCard key={crypto.id} crypto={crypto} />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'portfolio' && <PortfolioView cryptos={cryptos} />}
        </main>
      </div>
    </div>
  );
}

export default App;