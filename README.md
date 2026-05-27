# AI CSV Analyzer — Full Stack Project

> Python (FastAPI) + React + Claude AI | Real-World Financial Data | Built for job portfolios

---

## Tech Stack

| Layer | Tech | Purpose |
|---|---|---|
| Frontend | React + Recharts + PapaParse | Upload, visualize, interact |
| Backend | Python + FastAPI | REST API, data processing |
| ML | scikit-learn (Isolation Forest) | Anomaly detection |
| Data | pandas + yfinance | Statistics + real-world fetch |
| AI | Claude API (Anthropic) | Natural language insights |

---

## Project Structure

```
ai-csv-analyzer/
├── backend/
│   ├── main.py           # FastAPI routes
│   ├── analyzer.py       # pandas + scikit-learn engine
│   ├── data_fetcher.py   # yfinance + FRED data fetcher
│   └── requirements.txt
├── sample_data/
│   ├── apple_stock_1y.csv
│   ├── nvidia_stock_1y.csv
│   ├── nifty50_1y.csv
│   ├── tcs_india_1y.csv
│   ├── bitcoin_1y.csv
│   └── ...more
└── README.md
```

---

## Setup & Run

### 1. Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set your Anthropic API key
```bash
export ANTHROPIC_API_KEY=your_key_here
```
Get a free key at: https://console.anthropic.com

### 3. Start the backend
```bash
uvicorn main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
API docs: http://localhost:8000/docs

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/upload` | Upload CSV → full analysis |
| POST | `/fetch-data` | Fetch real-world stock/crypto/economic data |
| GET | `/available-datasets` | List of preloaded datasets |
| POST | `/insights` | AI insights via Claude |
| POST | `/anomaly-detection` | Isolation Forest anomaly detection |
| POST | `/correlation` | Correlation matrix |

---

## Example API Calls

### Fetch NVIDIA stock data (1 year)
```bash
curl -X POST http://localhost:8000/fetch-data \
  -H "Content-Type: application/json" \
  -d '{"dataset_type": "stocks", "symbol": "NVDA", "period": "1y"}'
```

### Fetch Nifty 50 (India)
```bash
curl -X POST http://localhost:8000/fetch-data \
  -H "Content-Type: application/json" \
  -d '{"dataset_type": "nifty", "symbol": "^NSEI", "period": "1y"}'
```

### Upload your own CSV
```bash
curl -X POST http://localhost:8000/upload \
  -F "file=@your_data.csv"
```

---

## Sample Datasets Included

| File | Description | Rows |
|---|---|---|
| apple_stock_1y.csv | AAPL stock — 1 year | 252 |
| nvidia_stock_1y.csv | NVDA stock — 1 year | 252 |
| nifty50_1y.csv | Nifty 50 index — 1 year | 252 |
| tcs_india_1y.csv | TCS (NSE) — 1 year | 252 |
| bitcoin_1y.csv | BTC-USD — 1 year | 365 |
| ethereum_1y.csv | ETH-USD — 1 year | 365 |

---

## What This Demonstrates (Resume Points)

- **RESTful API design** with FastAPI and Pydantic
- **Data engineering** with pandas (cleaning, transformation, aggregation)
- **Machine learning** — Isolation Forest for anomaly detection
- **Financial data** — real-world fetching via yfinance
- **AI integration** — Claude API for natural language analysis
- **Full-stack thinking** — connects to React frontend seamlessly
- **Production patterns** — CORS, error handling, modular architecture

---

## How to Extend

- Add PostgreSQL to store user uploads and analysis history
- Add Redis for caching repeated stock fetches
- Deploy backend to Railway, Render, or AWS Lambda
- Add authentication (JWT) for multi-user support
- Add email alerts when anomalies are detected

---

## Author

Built as a full-stack AI portfolio project.
Stack: Python · FastAPI · React · Claude AI · scikit-learn · yfinance
