import { useState } from 'react'
import Upload from './components/Upload'
import Dashboard from './components/Dashboard'
import RealData from './components/RealData'
import './App.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [analysisData, setAnalysisData] = useState(null)

  const handleAnalysis = (data) => {
    setAnalysisData(data)
    setPage('dashboard')
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setPage('home')}>
          <span className="nav-logo">⚡</span>
          <span>AI CSV Analyzer</span>
        </div>
        <div className="nav-links">
          <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Upload CSV</button>
          <button className={page === 'realdata' ? 'active' : ''} onClick={() => setPage('realdata')}>Real-World Data</button>
          {analysisData && (
            <button className={page === 'dashboard' ? 'active' : ''} onClick={() => setPage('dashboard')}>Dashboard</button>
          )}
        </div>
      </nav>

      <main className="main-content">
        {page === 'home' && <Upload onAnalysis={handleAnalysis} />}
        {page === 'realdata' && <RealData onAnalysis={handleAnalysis} />}
        {page === 'dashboard' && analysisData && <Dashboard data={analysisData} />}
      </main>

      <footer className="footer">
        <p>Built with Python + FastAPI + React · Full Stack AI Project</p>
      </footer>
    </div>
  )
}
