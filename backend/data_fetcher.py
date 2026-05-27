import yfinance as yf
import pandas as pd
import requests
from datetime import datetime, timedelta
import os


FRED_API_KEY = os.getenv("FRED_API_KEY", "")   # optional, free at fred.stlouisfed.org


class DataFetcher:
    """Fetch real-world financial & economic data for the past year."""

    def fetch(self, dataset_type: str, symbol: str, period: str = "1y"):
        handlers = {
            "stocks": self._fetch_stock,
            "nifty": self._fetch_stock,
            "crypto": self._fetch_stock,
            "economic": self._fetch_economic,
        }
        handler = handlers.get(dataset_type)
        if not handler:
            raise ValueError(f"Unknown dataset type: {dataset_type}. Choose from: {list(handlers.keys())}")
        return handler(symbol, period)

    # ── Stock / Crypto / Index ───────────────────────────────────────────────

    def _fetch_stock(self, symbol: str, period: str) -> tuple[pd.DataFrame, dict]:
        if not symbol:
            raise ValueError("Symbol is required for stock/crypto/nifty data")

        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period, auto_adjust=True)

        if hist.empty:
            raise ValueError(f"No data found for symbol '{symbol}'. Check if it's valid.")

        hist = hist.reset_index()
        hist.columns = [c.lower().replace(" ", "_") for c in hist.columns]

        # Add derived columns
        hist["daily_return_pct"] = hist["close"].pct_change() * 100
        hist["7d_ma"] = hist["close"].rolling(7).mean()
        hist["30d_ma"] = hist["close"].rolling(30).mean()
        hist["volatility_30d"] = hist["daily_return_pct"].rolling(30).std()
        hist["cumulative_return_pct"] = (hist["close"] / hist["close"].iloc[0] - 1) * 100

        # Round floats
        float_cols = ["open", "high", "low", "close", "daily_return_pct", "7d_ma", "30d_ma", "volatility_30d", "cumulative_return_pct"]
        for c in float_cols:
            if c in hist.columns:
                hist[c] = hist[c].round(4)

        info = ticker.info
        name = info.get("longName") or info.get("shortName") or symbol

        meta = {
            "name": f"{name} ({symbol}) — {period}",
            "symbol": symbol,
            "period": period,
            "currency": info.get("currency", "USD"),
            "exchange": info.get("exchange", ""),
            "sector": info.get("sector", ""),
            "industry": info.get("industry", ""),
            "latest_price": round(float(hist["close"].iloc[-1]), 2),
            "price_1y_ago": round(float(hist["close"].iloc[0]), 2),
            "total_return_pct": round(float(hist["cumulative_return_pct"].iloc[-1]), 2),
            "data_points": len(hist),
        }

        keep = ["date", "open", "high", "low", "close", "volume",
                "daily_return_pct", "7d_ma", "30d_ma", "volatility_30d", "cumulative_return_pct"]
        hist = hist[[c for c in keep if c in hist.columns]]

        return hist, meta

    # ── FRED Economic Data ───────────────────────────────────────────────────

    def _fetch_economic(self, series_id: str, period: str) -> tuple[pd.DataFrame, dict]:
        """Fetch from FRED (Federal Reserve Economic Data)."""
        names = {
            "DGS10": "US 10-Year Treasury Yield",
            "UNRATE": "US Unemployment Rate",
            "CPIAUCSL": "US Consumer Price Index",
            "FEDFUNDS": "Federal Funds Rate",
            "GDP": "US GDP",
        }

        if not series_id:
            series_id = "DGS10"

        end_date = datetime.today().strftime("%Y-%m-%d")
        start_date = (datetime.today() - timedelta(days=365)).strftime("%Y-%m-%d")

        if FRED_API_KEY:
            url = (
                f"https://api.stlouisfed.org/fred/series/observations"
                f"?series_id={series_id}&api_key={FRED_API_KEY}"
                f"&observation_start={start_date}&observation_end={end_date}&file_type=json"
            )
            resp = requests.get(url, timeout=10)
            data = resp.json()
            obs = data.get("observations", [])
            df = pd.DataFrame(obs)[["date", "value"]]
            df.columns = ["date", series_id.lower()]
            df[series_id.lower()] = pd.to_numeric(df[series_id.lower()], errors="coerce")
            df = df.dropna()
        else:
            # Fallback: use Yahoo Finance proxy for treasury yield
            df, meta = self._fetch_stock("^TNX" if series_id == "DGS10" else "^GSPC", period)
            df = df.rename(columns={"close": series_id.lower()})
            df = df[["date", series_id.lower()]]
            return df, {"name": names.get(series_id, series_id), "symbol": series_id, "note": "via Yahoo Finance proxy"}

        meta = {
            "name": names.get(series_id, series_id),
            "symbol": series_id,
            "source": "FRED (Federal Reserve)",
            "data_points": len(df),
        }
        return df, meta
