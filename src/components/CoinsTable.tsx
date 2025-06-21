"use client";

const mockCoins = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67000,
    change: 2.1,
    marketCap: 1300000000000,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3400,
    change: -1.2,
    marketCap: 410000000000,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 150,
    change: 4.5,
    marketCap: 65000000000,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    change: 0.8,
    marketCap: 21000000000,
  },
];

export default function CoinsTable() {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 shadow-lg w-full max-w-2xl overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Top Coins</h2>
      <table className="min-w-full text-left text-sm text-gray-200">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Symbol</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">24h Change</th>
            <th className="py-2 px-4">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {mockCoins.map((coin) => (
            <tr
              key={coin.symbol}
              className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
            >
              <td className="py-2 px-4 font-semibold">{coin.name}</td>
              <td className="py-2 px-4">{coin.symbol}</td>
              <td className="py-2 px-4">${coin.price.toLocaleString()}</td>
              <td
                className={`py-2 px-4 font-bold ${
                  coin.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {coin.change}%
              </td>
              <td className="py-2 px-4">${coin.marketCap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
