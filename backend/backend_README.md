---
title: Ai Csv Analyzer Backend
emoji: ⚡
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# ⚡ AI CSV Analyzer — Backend API

FastAPI backend for the AI CSV Analyzer platform.

## 🔗 Frontend
👉 [https://ai-csv-analyzer-beta.vercel.app](https://ai-csv-analyzer-beta.vercel.app)

## 📖 API Docs
👉 [/docs](./docs) — Interactive Swagger UI

## 🛠️ Stack
- **FastAPI** — REST API framework
- **pandas** — Data analysis
- **scikit-learn** — Isolation Forest anomaly detection
- **yfinance** — Real-world market data

## 🌍 Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Upload CSV → full analysis |
| `POST` | `/fetch-data` | Fetch live market data |
| `POST` | `/insights` | AI-powered insights |
| `POST` | `/anomaly-detection` | Isolation Forest ML |
| `POST` | `/correlation` | Correlation matrix |

## 👩‍💻 Author
**Akanksha Kesarkar** — [GitHub](https://github.com/AkankshaKesarkar)
