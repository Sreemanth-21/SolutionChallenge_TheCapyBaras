import React from 'react';
import { Coins, AlertTriangle, TrendingUp, ArrowDown } from 'lucide-react';

interface MemeCoin {
  name: string;
  symbol: string;
  riskLevel: 'High' | 'Very High' | 'Extreme';
  marketCap: string;
  description: string;
  trend: 'up' | 'down';
}

const memeCoins: MemeCoin[] = [
  {
    name: "Dogecoin",
    symbol: "DOGE",
    riskLevel: "High",
    marketCap: "$10B+",
    description: "The original meme coin, started as a joke but gained significant attention",
    trend: "up"
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    riskLevel: "Very High",
    marketCap: "$5B+",
    description: "Self-proclaimed 'Dogecoin killer' with a growing ecosystem",
    trend: "down"
  },
  {
    name: "Pepe",
    symbol: "PEPE",
    riskLevel: "Extreme",
    marketCap: "$500M+",
    description: "Based on the Pepe the Frog meme, highly volatile",
    trend: "up"
  }
];

const getRiskColor = (risk: MemeCoin['riskLevel']) => {
  switch (risk) {
    case 'High':
      return 'text-yellow-600 bg-yellow-100';
    case 'Very High':
      return 'text-orange-600 bg-orange-100';
    case 'Extreme':
      return 'text-red-600 bg-red-100';
  }
};

export function MemeCoinsRecommender() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-500 p-2 rounded-full">
          <Coins className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Meme Coins Watch List</h2>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-800 font-medium">High Risk Warning</h3>
            <p className="text-amber-700 text-sm">
              Meme coins are extremely volatile and speculative investments. Never invest more than you can afford to lose.
              These recommendations are for informational purposes only.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {memeCoins.map((coin, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{coin.name}</h3>
                <p className="text-sm text-gray-500">{coin.symbol}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getRiskColor(coin.riskLevel)}`}>
                {coin.riskLevel} Risk
              </span>
            </div>
            <p className="text-gray-700 mb-3">{coin.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Market Cap: {coin.marketCap}</span>
              <span className={`flex items-center gap-1 ${
                coin.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {coin.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                Trend
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}