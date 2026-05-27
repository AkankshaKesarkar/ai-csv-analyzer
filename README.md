# ⚡ AI CSV Analyzer

<div align="center">

![Banner](https://img.shields.io/badge/AI%20CSV%20Analyzer-Full%20Stack%20Project-4f46e5?style=for-the-badge&logo=python&logoColor=white)

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://ai-csv-analyzer-beta.vercel.app)
[![HuggingFace](https://img.shields.io/badge/Backend-HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black)](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A production-grade, full-stack AI data analytics platform built with Python + React.**
Upload any CSV or fetch live market data — get instant statistics, interactive charts, anomaly detection, and AI-generated insights.

[🚀 Live Demo](https://ai-csv-analyzer-beta.vercel.app) · [⚙️ Backend API](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs) · [🐛 Report Bug](https://github.com/AkankshaKesarkar/ai-csv-analyzer/issues)

</div>

---

## 🎯 What is this?

AI CSV Analyzer is a **full-stack data analytics platform** that lets you:

- 📂 **Upload any CSV** and get a complete statistical breakdown instantly
- 🌍 **Fetch real-world data** — US stocks, Indian market (Nifty 50, BSE), crypto
- 📊 **Visualize data** with interactive charts and correlation heatmaps
- 🤖 **Get AI insights** — automated pattern detection and recommendations
- 🔍 **Detect anomalies** using Isolation Forest (ML model)

---

## 🚀 Live Demo

👉 **[https://ai-csv-analyzer-beta.vercel.app](https://ai-csv-analyzer-beta.vercel.app)**

⚙️ **Backend API Docs:** [https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs)

---

## 🏗️ Architecture

```
USER BROWSER (React + Vite + Recharts)
         ↓ HTTP REST API
FASTAPI BACKEND (Hugging Face)
         ↓
  pandas + scikit-learn + yfinance
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📤 CSV Upload | Drag & drop any CSV — sales, finance, healthcare |
| 📈 Full Statistics | Mean, median, std, IQR, skewness, kurtosis |
| 📊 Interactive Charts | Distribution histograms, trend lines |
| 🔗 Correlation Matrix | Color-coded heatmap |
| 🤖 AI Insights | Automated pattern detection and recommendations |
| 🌍 Real-World Data | Live fetch: AAPL, NVDA, Nifty 50, BTC, ETH |
| 🔍 Anomaly Detection | Isolation Forest ML model |
| 📋 Data Preview | First 10 rows displayed |

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

### Deployment
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![HuggingFace](https://img.shields.io/badge/Backend-HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 📁 Project Structure

```
ai-csv-analyzer/
├── backend/
│   ├── main.py
│   ├── analyzer.py
│   ├── data_fetcher.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   └── src/
│       └── components/
│           ├── Upload.jsx
│           ├── Dashboard.jsx
│           └── RealData.jsx
└── sample_data/
```

## 🚀 Setup & Installation

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

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Set environment variable
Create `frontend/.env`:
VITE_API_URL=http://localhost:8000

---

## 🌍 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Upload CSV → full analysis |
| `POST` | `/fetch-data` | Fetch real-world market data |
| `POST` | `/insights` | AI-powered insights |
| `POST` | `/anomaly-detection` | Isolation Forest ML |
| `POST` | `/correlation` | Correlation matrix |

---

## 💡 What This Demonstrates

- ✅ **RESTful API design** with FastAPI and Pydantic validation
- ✅ **Data engineering** with pandas
- ✅ **Machine Learning** — Isolation Forest anomaly detection
- ✅ **Statistical analysis** — skewness, kurtosis, IQR
- ✅ **Financial data integration** via yfinance
- ✅ **Full-stack development** — React + Python
- ✅ **Production deployment** — Vercel + Hugging Face
- ✅ **Containerization** — Docker
- ✅ **Data visualization** — Recharts

---

## 🔮 Future Roadmap

- [ ] PostgreSQL for storing analysis history
- [ ] User authentication with JWT
- [ ] Export reports as PDF
- [ ] Email alerts for anomaly detection
- [ ] Support Excel and JSON formats
- [ ] Natural language query interface

---

## 🤝 Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---

## 👩‍💻 Author

**Akanksha Kesarkar**

[![GitHub](https://img.shields.io/badge/GitHub-AkankshaKesarkar-181717?style=flat-square&logo=github)](https://github.com/AkankshaKesarkar)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

Built with ❤️ using Python · FastAPI · React · scikit-learn · yfinance

🚀 **[View Live Demo](https://ai-csv-analyzer-beta.vercel.app)** · ⚙️ **[API Docs](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs)**

</div>
Save (Ctrl+S) and say "next"! 🚀

---

## 🚀 Setup & Installation

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

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Set environment variable
Create `frontend/.env`:

VITE_API_URL=http://localhost:8000

---

## 🌍 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Upload CSV → full analysis |
| `POST` | `/fetch-data` | Fetch real-world market data |
| `POST` | `/insights` | AI-powered insights |
| `POST` | `/anomaly-detection` | Isolation Forest ML |
| `POST` | `/correlation` | Correlation matrix |

---

## 💡 What This Demonstrates

- ✅ **RESTful API design** with FastAPI and Pydantic validation
- ✅ **Data engineering** with pandas
- ✅ **Machine Learning** — Isolation Forest anomaly detection
- ✅ **Statistical analysis** — skewness, kurtosis, IQR
- ✅ **Financial data integration** via yfinance
- ✅ **Full-stack development** — React + Python
- ✅ **Production deployment** — Vercel + Hugging Face
- ✅ **Containerization** — Docker
- ✅ **Data visualization** — Recharts

---

## 🔮 Future Roadmap

- [ ] PostgreSQL for storing analysis history
- [ ] User authentication with JWT
- [ ] Export reports as PDF
- [ ] Email alerts for anomaly detection
- [ ] Support Excel and JSON formats
- [ ] Natural language query interface

---

## 🤝 Contributing

1. Fork the project
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---

## 👩‍💻 Author

**Akanksha Kesarkar**

[![GitHub](https://img.shields.io/badge/GitHub-AkankshaKesarkar-181717?style=flat-square&logo=github)](https://github.com/AkankshaKesarkar)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

Built with ❤️ using Python · FastAPI · React · scikit-learn · yfinance

🚀 **[View Live Demo](https://ai-csv-analyzer-beta.vercel.app)** · ⚙️ **[API Docs](https://akankshakesarkar-ai-csv-analyzer-backend.hf.space/docs)**

</div>

