# ⚡ AI CSV Analyzer

<div align="center">

![AI CSV Analyzer Banner](https://img.shields.io/badge/AI%20CSV%20Analyzer-Full%20Stack%20Project-4f46e5?style=for-the-badge&logo=python&logoColor=white)

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/AkankshaKesarkar/ai-csv-analyzer?style=flat-square&color=yellow)](https://github.com/AkankshaKesarkar/ai-csv-analyzer/stargazers)

**A production-grade, full-stack AI data analytics platform built with Python + React.**
Upload any CSV or fetch live market data — get instant statistics, interactive charts, anomaly detection, and AI-generated insights.

[🚀 View Demo](#demo) · [📖 Documentation](#setup--installation) · [🐛 Report Bug](https://github.com/AkankshaKesarkar/ai-csv-analyzer/issues) · [✨ Request Feature](https://github.com/AkankshaKesarkar/ai-csv-analyzer/issues)

</div>

---

## 🎯 What is this?

AI CSV Analyzer is a **full-stack data analytics platform** that lets you:

- 📂 **Upload any CSV** and get a complete statistical breakdown instantly
- 🌍 **Fetch real-world data** — US stocks, Indian market (Nifty 50, BSE), crypto
- 📊 **Visualize data** with interactive charts and correlation heatmaps
- 🤖 **Get AI insights** — automated pattern detection and recommendations
- 🔍 **Detect anomalies** using Isolation Forest (ML model)

> Built as an industry-grade portfolio project demonstrating end-to-end full-stack + AI/ML skills.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📤 CSV Upload | Drag & drop any CSV — sales, finance, healthcare, streaming data |
| 📈 Full Statistics | Mean, median, std, IQR, skewness, kurtosis, outlier detection |
| 📊 Interactive Charts | Distribution histograms, trend lines per column |
| 🔗 Correlation Matrix | Color-coded heatmap showing relationships between columns |
| 🤖 AI Insights | Automated analysis — patterns, anomalies, recommendations |
| 🌍 Real-World Data | Live fetch: AAPL, NVDA, Nifty 50, BTC, ETH and more |
| 🔍 Anomaly Detection | Isolation Forest ML model flags outlier rows |
| 📋 Data Preview | First 10 rows with all column types displayed |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

---

## 📁 Project Structure

```
ai-csv-analyzer/
│
├── 📂 backend/
│   ├── main.py              # FastAPI app — 7 REST endpoints
│   ├── analyzer.py          # pandas + scikit-learn analysis engine
│   ├── data_fetcher.py      # yfinance real-world data fetcher
│   └── requirements.txt
│
├── 📂 frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Upload.jsx
│   │       ├── Dashboard.jsx
│   │       └── RealData.jsx
│   └── package.json
│
├── 📂 sample_data/
│   ├── apple_stock_1y.csv
│   ├── nvidia_stock_1y.csv
│   ├── nifty50_1y.csv
│   ├── bitcoin_1y.csv
│   └── ...9 more datasets
│
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+

### 1. Clone the repo
```bash
git clone https://github.com/AkankshaKesarkar/ai-csv-analyzer.git
cd ai-csv-analyzer
```

### 2. Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- Backend → `http://localhost:8000`
- Swagger docs → `http://localhost:8000/docs`

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
- Frontend → `http://localhost:3000`

---

## 🌍 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Upload CSV → full statistical analysis |
| `POST` | `/fetch-data` | Fetch real-world stock/crypto/economic data |
| `GET` | `/available-datasets` | List all available market datasets |
| `POST` | `/insights` | AI-powered insights and recommendations |
| `POST` | `/anomaly-detection` | Isolation Forest anomaly detection |
| `POST` | `/correlation` | Correlation matrix for numeric columns |

---

## 📊 Sample Datasets Included

| File | Description | Market |
|---|---|---|
| `apple_stock_1y.csv` | AAPL — 1 year OHLCV | 🇺🇸 US |
| `nvidia_stock_1y.csv` | NVDA — 1 year OHLCV | 🇺🇸 US |
| `nifty50_1y.csv` | Nifty 50 Index — 1 year | 🇮🇳 India |
| `tcs_india_1y.csv` | TCS (NSE) — 1 year | 🇮🇳 India |
| `reliance_1y.csv` | Reliance Industries | 🇮🇳 India |
| `infosys_1y.csv` | Infosys (NSE) | 🇮🇳 India |
| `bitcoin_1y.csv` | BTC-USD — 1 year | ₿ Crypto |
| `ethereum_1y.csv` | ETH-USD — 1 year | ₿ Crypto |

---

## 💡 What This Demonstrates

- ✅ **RESTful API design** with FastAPI and Pydantic validation
- ✅ **Data engineering** with pandas — cleaning, transformation, aggregation
- ✅ **Machine Learning** — Isolation Forest for unsupervised anomaly detection
- ✅ **Statistical analysis** — skewness, kurtosis, IQR, correlation
- ✅ **Financial data integration** — real-world fetching via yfinance
- ✅ **Full-stack development** — React frontend + Python backend
- ✅ **Production patterns** — CORS, error handling, modular architecture
- ✅ **Data visualization** — Recharts interactive charts

---

## 🔮 Future Roadmap

- [ ] PostgreSQL for storing analysis history
- [ ] User authentication with JWT
- [ ] Export reports as PDF
- [ ] Deploy to AWS / Railway / Render
- [ ] Email alerts for anomaly detection
- [ ] Support Excel and JSON formats

---

## 🤝 Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👩‍💻 Author

**Akanksha Kesarkar**

[![GitHub](https://img.shields.io/badge/GitHub-AkankshaKesarkar-181717?style=flat-square&logo=github)](https://github.com/AkankshaKesarkar)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

Built with ❤️ using Python · FastAPI · React · scikit-learn · yfinance

</div>
