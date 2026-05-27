import { useState, useEffect } from 'react'
import axios from 'axios'
import './RealData.css'

const DATASETS = {
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', flag: '🍎' },
    { symbol: 'NVDA', name: 'NVIDIA', flag: '🟢' },
    { symbol: 'MSFT', name: 'Microsoft', flag: '🪟' },
    { symbol: 'GOOGL', name: 'Alphabet (Google)', flag: '🔍' },
    { symbol: 'TSLA', name: 'Tesla', flag: '⚡' },
    { symbol: 'META', name: 'Meta Platforms', flag: '👤' },
    { symbol: 'AMZN', name: 'Amazon', flag: '📦' },
  ],
  nifty: [
    { symbol: '^NSEI', name: 'Nifty 50', flag: '🇮🇳' },
    { symbol: '^BSESN', name: 'BSE Sensex', flag: '🇮🇳' },
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries', flag: '🏭' },
    { symbol: 'TCS.NS', name: 'TCS', flag: '💻' },
    { symbol: 'INFY.NS', name: 'Infosys', flag: '🔷' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', flag: '🏦' },
  ],
  crypto: [
    { symbol: 'BTC-USD', name: 'Bitcoin', flag: '₿' },
    { symbol: 'ETH-USD', name: 'Ethereum', flag: '⧫' },
    { symbol: 'SOL-USD', name: 'Solana', flag: '☀️' },
  ]
}

export default function RealData({ onAnalysis }) {
  const [activeType, setActiveType] = useState('stocks')
  const [loading, setLoading] = useState(false)
  const [loadingSymbol, setLoadingSymbol] = useState('')
  const [error, setError] = useState('')

  const fetchData = async (symbol, type) => {
    setLoading(true)
    setLoadingSymbol(symbol)
    setError('')
    try {
      const res = await axios.post('http://localhost:8000/fetch-data', {
        dataset_type: type,
        symbol,
        period: '1y'
      })
      onAnalysis(res.data)
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to fetch data. Make sure the backend is running.')
    }
    setLoading(false)
    setLoadingSymbol('')
  }

  const types = [
    { key: 'stocks', label: '🇺🇸 US Stocks' },
    { key: 'nifty', label: '🇮🇳 India Market' },
    { key: 'crypto', label: '₿ Crypto' },
  ]

  return (
    <div className="realdata-page">
      <div className="rd-hero">
        <h1>Real-World Market Data</h1>
        <p>Fetch live 1-year data from global markets — analyze instantly</p>
      </div>

      <div className="type-tabs">
        {types.map(t => (
          <button key={t.key} className={activeType === t.key ? 'active' : ''} onClick={() => setActiveType(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <div className="rd-error">⚠️ {error}</div>}

      <div className="stocks-grid">
        {DATASETS[activeType].map(item => (
          <div key={item.symbol} className="stock-card">
            <div className="stock-flag">{item.flag}</div>
            <div className="stock-info">
              <div className="stock-symbol">{item.symbol}</div>
              <div className="stock-name">{item.name}</div>
            </div>
            <button
              className="fetch-btn"
              onClick={() => fetchData(item.symbol, activeType)}
              disabled={loading}
            >
              {loading && loadingSymbol === item.symbol ? (
                <span className="btn-spinner" />
              ) : '→ Analyze'}
            </button>
          </div>
        ))}
      </div>

      <div className="rd-info">
        <h3>📊 What you get</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>365 days</strong>
            <span>of historical OHLCV data</span>
          </div>
          <div className="info-item">
            <strong>7d & 30d MA</strong>
            <span>moving averages calculated</span>
          </div>
          <div className="info-item">
            <strong>Daily returns</strong>
            <span>% change per trading day</span>
          </div>
          <div className="info-item">
            <strong>Volatility</strong>
            <span>30-day rolling std deviation</span>
          </div>
          <div className="info-item">
            <strong>Cumulative return</strong>
            <span>total % gain/loss over 1 year</span>
          </div>
          <div className="info-item">
            <strong>Outlier detection</strong>
            <span>IQR-based anomaly flagging</span>
          </div>
        </div>
      </div>
    </div>
  )
}
