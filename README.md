<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=AI%20CSV%20Analyzer&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Full%20Stack%20AI%20Data%20Analytics%20Platform&descAlignY=55&descSize=18" width="100%"/>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&multiline=true&width=700&height=100&lines=Upload+CSV+%E2%86%92+Get+AI+Insights+in+Seconds+%F0%9F%A4%96;Real-World+Market+Data+%F0%9F%93%88+Stocks+%7C+Crypto+%7C+Nifty50;Anomaly+Detection+with+Isolation+Forest+%F0%9F%94%8D" alt="Typing SVG" />
</a>

<br/>

<!-- Badges Row 1 -->
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

<!-- Badges Row 2 -->
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-csv-analyzer-beta.vercel.app)
[![HuggingFace](https://img.shields.io/badge/Backend-HuggingFace%20Spaces-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<!-- Stats -->
[![GitHub stars](https://img.shields.io/github/stars/AkankshaKesarkar/ai-csv-analyzer?style=for-the-badge&color=yellow&logo=github)](https://github.com/AkankshaKesarkar/ai-csv-analyzer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AkankshaKesarkar/ai-csv-analyzer?style=for-the-badge&color=blue&logo=github)](https://github.com/AkankshaKesarkar/ai-csv-analyzer/network)
[![GitHub commits](https://img.shields.io/github/commit-activity/t/AkankshaKesarkar/ai-csv-analyzer?style=for-the-badge&color=purple&logo=github)](https://github.com/AkankshaKesarkar/ai-csv-analyzer/commits)

<br/>

<!-- Live Demo Button -->
<a href="https://ai-csv-analyzer-beta.vercel.app">
  <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-Click%20Here-6366f1?style=for-the-badge&logoColor=white" height="40"/>
</a>
&nbsp;
<a href="https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs">
  <img src="https://img.shields.io/badge/⚙️%20API%20DOCS-Swagger%20UI-009688?style=for-the-badge&logoColor=white" height="40"/>
</a>

</div>

---

## 🎯 What Makes This Special?

> **Not just another CSV viewer.** This is a production-grade, end-to-end AI analytics platform that ingests raw data and transforms it into actionable intelligence — in seconds.

<table>
<tr>
<td width="50%">

### 🧠 Intelligence Layer
- 🤖 **AI-Powered Insights** — automated pattern detection
- 🔍 **Isolation Forest ML** — unsupervised anomaly detection
- 📊 **Statistical Engine** — skewness, kurtosis, IQR analysis
- 🌍 **Live Market Data** — real-time stocks, crypto, indices

</td>
<td width="50%">

### ⚡ Engineering Layer
- 🚀 **FastAPI Backend** — async Python REST API
- ⚛️ **React Frontend** — component-based SPA
- 🐳 **Dockerized** — containerized for portability
- ☁️ **Fully Deployed** — Vercel + Hugging Face Spaces

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```mermaid
graph LR
    A([👤 User]) -->|Upload CSV\nor Select Market| B

    subgraph FRONTEND ["⚛️ React Frontend — Vercel"]
        B[Upload.jsx] --> C[Dashboard.jsx]
        C --> D[Charts 📊]
        C --> E[Insights 🤖]
        C --> F[Anomalies 🔍]
    end

    subgraph BACKEND ["🚀 FastAPI Backend — Hugging Face"]
        G[POST /upload] --> H[🐼 pandas\nAnalysis Engine]
        I[POST /fetch-data] --> J[📈 yfinance\nMarket Data]
        K[POST /insights] --> L[🧠 AI\nInsights Engine]
        M[POST /anomaly-detection] --> N[🔍 scikit-learn\nIsolation Forest]
    end

    B -->|HTTP REST| G
    B -->|HTTP REST| I
    E -->|HTTP REST| K
    F -->|HTTP REST| M
    H -->|JSON| C
    J -->|JSON| C

    style FRONTEND fill:#1e1b4b,color:#fff
    style BACKEND fill:#064e3b,color:#fff
```

---

## ✨ Features Showcase

| | Feature | What It Does |
|---|---|---|
| 📤 | **CSV Upload** | Drag & drop any CSV — sales, finance, healthcare, IoT |
| 📈 | **Full Statistics** | Mean, median, std, IQR, skewness, kurtosis, outliers |
| 📊 | **Interactive Charts** | Distribution histograms + monthly trend lines |
| 🔗 | **Correlation Matrix** | Color-coded heatmap of column relationships |
| 🤖 | **AI Insights** | Pattern detection, risk flags, recommendations |
| 🌍 | **Real-World Data** | Live: AAPL, NVDA, Nifty 50, BTC, ETH, Sensex |
| 🔍 | **Anomaly Detection** | Isolation Forest flags outlier rows automatically |
| 📋 | **Data Preview** | First 10 rows with full column type detection |

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Recharts](https://img.shields.io/badge/Recharts-Interactive_Charts-4f46e5?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![yfinance](https://img.shields.io/badge/yfinance-Market_Data-00897B?style=for-the-badge)

### Deployment & DevOps
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![HuggingFace](https://img.shields.io/badge/Hugging_Face-Backend-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Source_Control-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## 📁 Project Structure

```
ai-csv-analyzer/
│
├── 📂 backend/                     # Python FastAPI Backend
│   ├── 🐍 main.py                  # 7 REST API endpoints
│   ├── 🔬 analyzer.py              # pandas + scikit-learn engine
│   ├── 📈 data_fetcher.py          # yfinance market data fetcher
│   ├── 🐳 Dockerfile               # Docker config → Hugging Face
│   └── 📋 requirements.txt
│
├── 📂 frontend/                    # React + Vite Frontend
│   └── 📂 src/
│       ├── 📂 components/
│       │   ├── ⬆️  Upload.jsx      # CSV drag & drop upload
│       │   ├── 📊 Dashboard.jsx    # Full analytics dashboard
│       │   └── 🌍 RealData.jsx     # Live market data page
│       ├── App.jsx
│       └── main.jsx
│
├── 📂 sample_data/                 # 11 real-world CSV datasets
│   ├── 🍎 apple_stock_1y.csv
│   ├── 🟢 nvidia_stock_1y.csv
│   ├── 🇮🇳 nifty50_1y.csv
│   ├── ₿  bitcoin_1y.csv
│   └── ... 7 more
│
└── 📄 README.md
```

---

## 🚀 Quick Start

### Option A — Use Live Demo (No Setup!)
👉 **[https://ai-csv-analyzer-beta.vercel.app](https://ai-csv-analyzer-beta.vercel.app)**

### Option B — Run Locally

```bash
# 1. Clone
git clone https://github.com/AkankshaKesarkar/ai-csv-analyzer.git
cd ai-csv-analyzer

# 2. Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# → http://localhost:8000/docs

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

---

## 🌍 API Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/` | Health check | None |
| `GET` | `/health` | Detailed health | None |
| `POST` | `/upload` | CSV → full analysis | None |
| `POST` | `/fetch-data` | Live market data | None |
| `POST` | `/insights` | AI insights | None |
| `POST` | `/anomaly-detection` | Isolation Forest ML | None |
| `POST` | `/correlation` | Correlation matrix | None |

> 📖 Full interactive docs: [https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs)

---

## 📊 Sample Datasets

<div align="center">

| Dataset | Symbol | Market | Period |
|---|---|---|---|
| 🍎 Apple Inc. | `AAPL` | 🇺🇸 US | 1 Year |
| 🟢 NVIDIA | `NVDA` | 🇺🇸 US | 1 Year |
| 🪟 Microsoft | `MSFT` | 🇺🇸 US | 1 Year |
| ⚡ Tesla | `TSLA` | 🇺🇸 US | 1 Year |
| 🇮🇳 Nifty 50 | `^NSEI` | 🇮🇳 India | 1 Year |
| 💻 TCS | `TCS.NS` | 🇮🇳 India | 1 Year |
| 🏭 Reliance | `RELIANCE.NS` | 🇮🇳 India | 1 Year |
| 🔷 Infosys | `INFY.NS` | 🇮🇳 India | 1 Year |
| ₿ Bitcoin | `BTC-USD` | Crypto | 1 Year |
| ⧫ Ethereum | `ETH-USD` | Crypto | 1 Year |
| ☀️ Solana | `SOL-USD` | Crypto | 1 Year |

</div>

---

## 💡 Skills Demonstrated

<div align="center">

| Domain | Skills |
|---|---|
| 🔧 **Backend** | FastAPI, REST API design, Pydantic validation, CORS |
| 🐼 **Data Engineering** | pandas, NumPy, data cleaning, transformation |
| 🤖 **Machine Learning** | Isolation Forest, StandardScaler, unsupervised ML |
| 📊 **Statistics** | Skewness, kurtosis, IQR, outlier detection, correlation |
| 💰 **Finance** | OHLCV data, moving averages, volatility, returns |
| ⚛️ **Frontend** | React, Vite, Recharts, Axios, component architecture |
| ☁️ **DevOps** | Docker, Vercel deployment, Hugging Face Spaces, CI/CD |
| 🌐 **Full Stack** | End-to-end feature development, API integration |

</div>

---

## 🔮 Roadmap

- [ ] 🗄️ PostgreSQL — store analysis history
- [ ] 🔐 JWT Authentication — user accounts
- [ ] 📄 PDF Export — download analysis reports
- [ ] 📧 Email Alerts — anomaly notifications
- [ ] 📑 Excel/JSON Support — more file formats
- [ ] 💬 Natural Language Queries — "show me top outliers"
- [ ] 📱 Mobile Responsive — full mobile support

---

## 🤝 Contributing

```bash
# Fork → Clone → Branch → Code → PR
git checkout -b feature/YourAmazingFeature
git commit -m "✨ Add YourAmazingFeature"
git push origin feature/YourAmazingFeature
# Open Pull Request 🚀
```

---

## 📄 License

Distributed under the **MIT License** — use freely, credit kindly.

---

## 👩‍💻 Author

<div align="center">

**Akanksha Kesarkar**

[![GitHub](https://img.shields.io/badge/GitHub-AkankshaKesarkar-181717?style=for-the-badge&logo=github)](https://github.com/AkankshaKesarkar)

</div>

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

**⭐ Star this repo if it helped you! ⭐**

Built with ❤️ using Python · FastAPI · React · scikit-learn · yfinance · Docker

🚀 **[Live Demo](https://ai-csv-analyzer-beta.vercel.app)** · ⚙️ **[API Docs](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs)** · 🐛 **[Report Bug](https://github.com/AkankshaKesarkar/ai-csv-analyzer/issues)**

</div>
