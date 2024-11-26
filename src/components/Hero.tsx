import React from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Track Your Crypto Portfolio
            <br />
            <span className="text-indigo-200">With Precision</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            A powerful cryptocurrency portfolio tracker built by Mustafa Hussaini.
            Monitor prices, manage your investments, and track your gains in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <TrendingUp className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-indigo-100">
              Monitor your investments with live price updates and market data.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <Shield className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p className="text-indigo-100">
              Your portfolio data is securely stored locally on your device.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <Zap className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-indigo-100">
              Get insights into your portfolio performance and market trends.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-indigo-200">
            Developed with ❤️ by Mustafa Hussaini
          </p>
        </div>
      </div>
    </div>
  );
};