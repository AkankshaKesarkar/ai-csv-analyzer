import { useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'
import './Dashboard.css'

export default function Dashboard({ data }) {
  const [selectedCol, setSelectedCol] = useState(data.columns?.numeric?.[0] || '')
  const [insights, setInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const numericCols = data.columns?.numeric || []
  const categoricalCols = data.columns?.categorical || []

  const getInsights = async () => {
    setLoadingInsights(true)
    try {
      const res = await axios.post('http://localhost:8000/insights', {
        summary: {
          shape: data.shape,
          missing: data.missing,
          numeric_stats: Object.fromEntries(
            Object.entries(data.numeric_stats || {}).map(([k, v]) => [k, {
              mean: v.mean, median: v.median, std: v.std,
              min: v.min, max: v.max, skewness: v.skewness,
              outlier_pct: v.outlier_pct
            }])
          ),
          correlation: data.correlation,
          trend: data.trend
        },
        dataset_name: data.name
      })
      setInsights(res.data.insights)
    } catch (e) {
      setInsights('Failed to generate insights. Make sure backend is running.')
    }
    setLoadingInsights(false)
  }

  const histData = selectedCol && data.numeric_stats?.[selectedCol]?.histogram
    ? data.numeric_stats[selectedCol].histogram.map(b => ({
        name: b.bin_start.toFixed(1),
        count: b.count
      }))
    : []

  const trendData = data.trend?.monthly_data || []

  const corrCols = Object.keys(data.correlation || {})

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h2>{data.name}</h2>
          <p>{data.shape?.rows?.toLocaleString()} rows · {data.shape?.columns} columns</p>
        </div>
        {data.meta && (
          <div className="meta-badge">
            <span>💰 {data.meta.latest_price} {data.meta.currency}</span>
            <span className={data.meta.total_return_pct >= 0 ? 'pos' : 'neg'}>
              {data.meta.total_return_pct >= 0 ? '▲' : '▼'} {Math.abs(data.meta.total_return_pct)}%
            </span>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="metric-row">
        <div className="metric-card">
          <div className="metric-label">Total Rows</div>
          <div className="metric-value">{data.shape?.rows?.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Columns</div>
          <div className="metric-value">{data.shape?.columns}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Missing Values</div>
          <div className="metric-value" style={{ color: data.missing?.percentage > 5 ? '#dc2626' : '#16a34a' }}>
            {data.missing?.percentage}%
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Numeric Cols</div>
          <div className="metric-value">{numericCols.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Categorical Cols</div>
          <div className="metric-value">{categoricalCols.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['overview', 'charts', 'correlation', 'preview', 'insights'].map(t => (
          <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <h3 className="section-title">Numeric Column Statistics</h3>
          {numericCols.map(col => {
            const s = data.numeric_stats?.[col]
            if (!s) return null
            return (
              <div key={col} className="stat-block">
                <div className="stat-block-header">
                  <span className="col-name">{col}</span>
                  {s.outlier_pct > 5 && <span className="badge red">{s.outlier_pct}% outliers</span>}
                  {s.outlier_pct > 0 && s.outlier_pct <= 5 && <span className="badge yellow">{s.outlier_pct}% outliers</span>}
                  {s.outlier_pct === 0 && <span className="badge green">No outliers</span>}
                </div>
                <div className="stat-grid">
                  {[['Mean', s.mean], ['Median', s.median], ['Std Dev', s.std],
                    ['Min', s.min], ['Max', s.max], ['Skewness', s.skewness]].map(([label, val]) => (
                    <div key={label} className="stat-item">
                      <div className="stat-label">{label}</div>
                      <div className="stat-val">{typeof val === 'number' ? val.toFixed(2) : val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {categoricalCols.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: '2rem' }}>Categorical Columns</h3>
              {categoricalCols.map(col => {
                const s = data.categorical_stats?.[col]
                if (!s) return null
                return (
                  <div key={col} className="stat-block">
                    <div className="stat-block-header">
                      <span className="col-name">{col}</span>
                      <span className="badge blue">{s.unique?.toLocaleString()} unique</span>
                    </div>
                    <div className="top-values">
                      {s.top_values?.slice(0, 5).map((v, i) => (
                        <div key={i} className="top-val-row">
                          <span>{v.value}</span>
                          <div className="val-bar-wrap">
                            <div className="val-bar" style={{ width: `${Math.min(v.pct * 5, 100)}%` }} />
                          </div>
                          <span className="val-count">{v.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {/* Charts Tab */}
      {activeTab === 'charts' && (
        <div className="tab-content">
          <h3 className="section-title">Distribution Chart</h3>
          <div className="col-selector">
            {numericCols.map(c => (
              <button key={c} className={selectedCol === c ? 'col-btn active' : 'col-btn'} onClick={() => setSelectedCol(c)}>{c}</button>
            ))}
          </div>
          {histData.length > 0 && (
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={histData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {trendData.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: '2rem' }}>
                Monthly Trend — {data.trend?.value_col}
                <span className={`trend-badge ${data.trend?.direction === 'up' ? 'up' : 'down'}`}>
                  {data.trend?.direction === 'up' ? '▲' : '▼'} {data.trend?.pct_change}%
                </span>
              </h3>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}

      {/* Correlation Tab */}
      {activeTab === 'correlation' && (
        <div className="tab-content">
          <h3 className="section-title">Correlation Matrix</h3>
          {corrCols.length > 0 ? (
            <div className="corr-table-wrap">
              <table className="corr-table">
                <thead>
                  <tr>
                    <th></th>
                    {corrCols.map(c => <th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {corrCols.map(row => (
                    <tr key={row}>
                      <td className="corr-row-label">{row}</td>
                      {corrCols.map(col => {
                        const val = data.correlation?.[row]?.[col]
                        const abs = Math.abs(val || 0)
                        const bg = val === 1 ? '#e0e7ff'
                          : abs > 0.7 ? (val > 0 ? '#bbf7d0' : '#fecaca')
                          : abs > 0.4 ? (val > 0 ? '#d1fae5' : '#fee2e2')
                          : '#f9fafb'
                        return (
                          <td key={col} style={{ background: bg, textAlign: 'center', fontWeight: abs > 0.5 ? 600 : 400 }}>
                            {typeof val === 'number' ? val.toFixed(2) : '—'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p style={{ color: '#888' }}>Not enough numeric columns for correlation.</p>}
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="tab-content">
          <h3 className="section-title">Data Preview (first 10 rows)</h3>
          <div className="preview-wrap">
            <table className="preview-table">
              <thead>
                <tr>{Object.keys(data.preview?.[0] || {}).map(k => <th key={k}>{k}</th>)}</tr>
              </thead>
              <tbody>
                {data.preview?.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((v, j) => (
                      <td key={j}>{v === null ? '—' : String(v).substring(0, 30)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="tab-content">
          <h3 className="section-title">AI-Powered Insights</h3>
          {!insights && (
            <button className="insights-btn" onClick={getInsights} disabled={loadingInsights}>
              {loadingInsights ? '⏳ Analyzing...' : '🤖 Generate Insights'}
            </button>
          )}
          {insights && (
            <>
              <div className="insights-box">
                {insights.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('KEY') || line.startsWith('PATTERNS') || line.startsWith('ANOMALIES') || line.startsWith('RECOMMENDATIONS') ? 'insight-heading' : 'insight-line'}>
                    {line}
                  </p>
                ))}
              </div>
              <button className="insights-btn secondary" onClick={getInsights} disabled={loadingInsights}>
                🔄 Regenerate
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
