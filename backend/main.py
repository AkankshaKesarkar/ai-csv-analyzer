from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import io
from analyzer import DataAnalyzer
from data_fetcher import DataFetcher
import anthropic
import json

app = FastAPI(
    title="AI CSV Analyzer API",
    description="Real-world data analysis powered by Python + Claude AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = DataAnalyzer()
fetcher = DataFetcher()
client = anthropic.Anthropic()  # uses ANTHROPIC_API_KEY from env


# ── Models ──────────────────────────────────────────────────────────────────

class InsightRequest(BaseModel):
    summary: dict
    dataset_name: str = "dataset"

class FetchRequest(BaseModel):
    dataset_type: str   # "stocks", "crypto", "economic", "nifty"
    symbol: str = ""    # e.g. "AAPL", "BTC-USD", "^NSEI"
    period: str = "1y"


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "running", "message": "AI CSV Analyzer backend is live"}

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """Upload a CSV and get full statistical analysis."""
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    content = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to parse CSV: {str(e)}")

    if df.empty:
        raise HTTPException(status_code=422, detail="CSV file is empty")

    return analyzer.analyze(df, name=file.filename)


@app.post("/fetch-data")
def fetch_real_data(req: FetchRequest):
    """
    Fetch real-world data for the past year.
    Types: stocks, crypto, economic, nifty
    """
    try:
        df, meta = fetcher.fetch(req.dataset_type, req.symbol, req.period)
        analysis = analyzer.analyze(df, name=meta["name"])
        analysis["meta"] = meta
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/available-datasets")
def available_datasets():
    """Return list of quick-load real-world datasets."""
    return {
        "stocks": [
            {"symbol": "AAPL", "name": "Apple Inc."},
            {"symbol": "GOOGL", "name": "Alphabet (Google)"},
            {"symbol": "MSFT", "name": "Microsoft"},
            {"symbol": "NVDA", "name": "NVIDIA"},
            {"symbol": "AMZN", "name": "Amazon"},
            {"symbol": "META", "name": "Meta Platforms"},
            {"symbol": "TSLA", "name": "Tesla"},
        ],
        "nifty": [
            {"symbol": "^NSEI", "name": "Nifty 50"},
            {"symbol": "^BSESN", "name": "BSE Sensex"},
            {"symbol": "RELIANCE.NS", "name": "Reliance Industries"},
            {"symbol": "TCS.NS", "name": "TCS"},
            {"symbol": "INFY.NS", "name": "Infosys"},
            {"symbol": "HDFCBANK.NS", "name": "HDFC Bank"},
        ],
        "crypto": [
            {"symbol": "BTC-USD", "name": "Bitcoin"},
            {"symbol": "ETH-USD", "name": "Ethereum"},
            {"symbol": "SOL-USD", "name": "Solana"},
        ],
        "economic": [
            {"symbol": "DGS10", "name": "US 10-Year Treasury Yield"},
            {"symbol": "UNRATE", "name": "US Unemployment Rate"},
            {"symbol": "CPIAUCSL", "name": "US Consumer Price Index"},
        ]
    }


@app.post("/insights")
def get_ai_insights(req: InsightRequest):
    """Generate insights using built-in analysis engine — no API key needed."""
    summary = req.summary
    name = req.dataset_name
    insights = []

    shape = summary.get("shape", {})
    rows = shape.get("rows", 0)
    cols = shape.get("columns", 0)
    missing = summary.get("missing", {})
    missing_pct = missing.get("percentage", 0)

    insights.append("KEY OBSERVATIONS")
    insights.append(f"- Dataset '{name}' has {rows:,} rows and {cols} columns.")
    if missing_pct == 0:
        insights.append("- No missing values — data quality is excellent.")
    elif missing_pct < 5:
        insights.append(f"- {missing_pct}% missing values — minor, consider imputation.")
    else:
        insights.append(f"- {missing_pct}% missing values — significant issue, fix before analysis.")

    numeric_stats = summary.get("numeric_stats", {})
    insights.append("\nPATTERNS & TRENDS")
    for col, stats in numeric_stats.items():
        mean = stats.get("mean", 0)
        std = stats.get("std", 0)
        skewness = stats.get("skewness", 0)
        cv = (std / mean * 100) if mean != 0 else 0
        if abs(skewness) > 1:
            direction = "right" if skewness > 0 else "left"
            insights.append(f"- '{col}' is strongly skewed {direction} (skewness={skewness:.2f}) — consider log transform.")
        else:
            insights.append(f"- '{col}' is roughly normal (mean={mean:.2f}, std={std:.2f}).")
        if cv > 50:
            insights.append(f"  -> High variability in '{col}' (CV={cv:.1f}%) — wide data spread.")

    correlation = summary.get("correlation", {})
    insights.append("\nANOMALIES & RISKS")
    strong_corr = []
    for col1, corr_vals in correlation.items():
        if isinstance(corr_vals, dict):
            for col2, val in corr_vals.items():
                if col1 != col2 and isinstance(val, (int, float)) and abs(val) > 0.5:
                    strong_corr.append((col1, col2, val))
    if strong_corr:
        for c1, c2, val in strong_corr:
            d = "positive" if val > 0 else "negative"
            insights.append(f"- Strong {d} correlation ({val:.2f}) between '{c1}' and '{c2}'.")
    else:
        insights.append("- No strong correlations detected between numeric columns.")

    for col, stats in numeric_stats.items():
        op = stats.get("outlier_pct", 0)
        if op > 5:
            insights.append(f"- '{col}' has {op}% outliers — investigate using IQR filtering.")
        elif op > 0:
            insights.append(f"- '{col}' has {op}% mild outliers — may be valid edge cases.")

    trend = summary.get("trend", {})
    if trend:
        pct_change = trend.get("pct_change", 0)
        val_col = trend.get("value_col", "")
        direc = trend.get("direction", "")
        insights.append(f"- Trend: '{val_col}' moved {direc} by {pct_change:.1f}% over the period.")

    insights.append("\nRECOMMENDATIONS")
    rec = 1
    if missing_pct > 0:
        insights.append(f"{rec}. Fix missing values — median imputation for numeric, mode for categorical.")
        rec += 1
    if any(s.get("outlier_pct", 0) > 5 for s in numeric_stats.values()):
        insights.append(f"{rec}. Run /anomaly-detection endpoint to isolate and review outlier rows.")
        rec += 1
    if strong_corr:
        insights.append(f"{rec}. Investigate correlated columns — may reveal key business relationships.")
        rec += 1
    if rows > 100000:
        insights.append(f"{rec}. Large dataset ({rows:,} rows) — use sampling for faster ML training.")
        rec += 1
    insights.append(f"{rec}. Explore the Charts and Correlation tabs to visually identify patterns column by column.")

    return {"insights": "\n".join(insights)}


@app.post("/anomaly-detection")
async def detect_anomalies(file: UploadFile = File(...)):
    """Run Isolation Forest anomaly detection on uploaded CSV."""
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    return analyzer.detect_anomalies(df)


@app.post("/correlation")
async def correlation_matrix(file: UploadFile = File(...)):
    """Return correlation matrix for numeric columns."""
    content = await file.read()
    df = pd.read_csv(io.BytesIO(content))
    return analyzer.correlation(df)
