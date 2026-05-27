import { useState, useRef } from 'react'
import axios from 'axios'
import './Upload.css'

export default function Upload({ onAnalysis }) {
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const inputRef = useRef()

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith('.csv')) {
      setError('Please upload a valid .csv file')
      return
    }
    setError('')
    setFileName(file.name)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/upload', formData)
      onAnalysis(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze file. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="upload-page">
      <div className="upload-hero">
        <h1>AI-Powered CSV Analyzer</h1>
        <p>Upload any CSV dataset — get instant statistics, charts, and smart insights</p>
      </div>

      <div
        className={`drop-zone ${dragging ? 'dragging' : ''} ${loading ? 'loading' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !loading && inputRef.current.click()}
      >
        <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
        {loading ? (
          <>
            <div className="spinner" />
            <p className="dz-title">Analyzing <strong>{fileName}</strong>...</p>
            <p className="dz-sub">Running pandas + scikit-learn analysis</p>
          </>
        ) : (
          <>
            <div className="dz-icon">📂</div>
            <p className="dz-title">Drop your CSV here or <span>click to browse</span></p>
            <p className="dz-sub">Supports any CSV — sales, finance, healthcare, streaming data etc.</p>
          </>
        )}
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      <div className="sample-hint">
        <p>💡 Try the sample datasets from the <strong>sample_data/</strong> folder in your project:</p>
        <div className="sample-tags">
          {['nvidia_stock_1y.csv', 'bitcoin_1y.csv', 'nifty50_1y.csv', 'apple_stock_1y.csv', 'tcs_india_1y.csv'].map(f => (
            <span key={f} className="tag">{f}</span>
          ))}
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span>📊</span>
          <h3>Full Statistics</h3>
          <p>Mean, median, std, IQR, skewness, kurtosis, outlier detection</p>
        </div>
        <div className="feature-card">
          <span>📈</span>
          <h3>Interactive Charts</h3>
          <p>Distribution histograms, trend lines, correlation heatmap</p>
        </div>
        <div className="feature-card">
          <span>🤖</span>
          <h3>AI Insights</h3>
          <p>Automated pattern detection, anomaly alerts, recommendations</p>
        </div>
        <div className="feature-card">
          <span>🌍</span>
          <h3>Real-World Data</h3>
          <p>Fetch live stocks, crypto, Nifty 50, BSE Sensex data</p>
        </div>
      </div>
    </div>
  )
}
