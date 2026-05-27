import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from typing import Optional
import warnings
warnings.filterwarnings("ignore")


class DataAnalyzer:
    """Core analytics engine: statistics, anomaly detection, correlation."""

    def analyze(self, df: pd.DataFrame, name: str = "dataset") -> dict:
        df = df.copy()
        df.columns = [str(c).strip() for c in df.columns]

        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        categorical_cols = df.select_dtypes(include=["object", "category"]).columns.tolist()
        datetime_cols = self._detect_datetime_cols(df)

        total_cells = df.shape[0] * df.shape[1]
        missing_cells = df.isnull().sum().sum()

        result = {
            "name": name,
            "shape": {"rows": int(df.shape[0]), "columns": int(df.shape[1])},
            "missing": {
                "total": int(missing_cells),
                "percentage": round(missing_cells / total_cells * 100, 2) if total_cells else 0,
                "by_column": {
                    c: int(df[c].isnull().sum())
                    for c in df.columns if df[c].isnull().sum() > 0
                }
            },
            "columns": {
                "numeric": numeric_cols,
                "categorical": categorical_cols,
                "datetime": datetime_cols,
            },
            "numeric_stats": self._numeric_stats(df, numeric_cols),
            "categorical_stats": self._categorical_stats(df, categorical_cols),
            "preview": df.head(10).replace({np.nan: None}).to_dict(orient="records"),
            "dtypes": {c: str(df[c].dtype) for c in df.columns},
        }

        if len(numeric_cols) >= 2:
            result["correlation"] = self.correlation(df, numeric_cols)

        if datetime_cols and numeric_cols:
            result["trend"] = self._trend_summary(df, datetime_cols[0], numeric_cols[0])

        return result

    def _numeric_stats(self, df: pd.DataFrame, cols: list) -> dict:
        stats = {}
        for col in cols:
            s = df[col].dropna()
            if len(s) == 0:
                continue
            q1, q3 = float(s.quantile(0.25)), float(s.quantile(0.75))
            iqr = q3 - q1
            outlier_count = int(((s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)).sum())
            stats[col] = {
                "count": int(s.count()),
                "mean": round(float(s.mean()), 4),
                "median": round(float(s.median()), 4),
                "std": round(float(s.std()), 4),
                "min": round(float(s.min()), 4),
                "max": round(float(s.max()), 4),
                "q1": round(q1, 4),
                "q3": round(q3, 4),
                "iqr": round(iqr, 4),
                "skewness": round(float(s.skew()), 4),
                "kurtosis": round(float(s.kurt()), 4),
                "outlier_count": outlier_count,
                "outlier_pct": round(outlier_count / len(s) * 100, 2),
                "histogram": self._histogram(s),
            }
        return stats

    def _categorical_stats(self, df: pd.DataFrame, cols: list) -> dict:
        stats = {}
        for col in cols:
            s = df[col].dropna().astype(str)
            freq = s.value_counts()
            stats[col] = {
                "unique": int(s.nunique()),
                "top_values": [
                    {"value": v, "count": int(c), "pct": round(c / len(s) * 100, 2)}
                    for v, c in freq.head(10).items()
                ],
                "mode": str(freq.index[0]) if len(freq) > 0 else None,
            }
        return stats

    def _histogram(self, series: pd.Series, bins: int = 15) -> list:
        counts, edges = np.histogram(series.dropna(), bins=bins)
        return [
            {"bin_start": round(float(edges[i]), 4), "bin_end": round(float(edges[i+1]), 4), "count": int(counts[i])}
            for i in range(len(counts))
        ]

    def _detect_datetime_cols(self, df: pd.DataFrame) -> list:
        dt_cols = []
        for col in df.columns:
            if df[col].dtype == "object":
                try:
                    sample = df[col].dropna().head(20)
                    parsed = pd.to_datetime(sample, infer_datetime_format=True, errors="coerce")
                    if parsed.notna().sum() >= len(sample) * 0.8:
                        df[col] = pd.to_datetime(df[col], infer_datetime_format=True, errors="coerce")
                        dt_cols.append(col)
                except Exception:
                    pass
            elif pd.api.types.is_datetime64_any_dtype(df[col]):
                dt_cols.append(col)
        return dt_cols

    def _trend_summary(self, df: pd.DataFrame, date_col: str, value_col: str) -> dict:
        try:
            tmp = df[[date_col, value_col]].dropna().copy()
            tmp[date_col] = pd.to_datetime(tmp[date_col], errors="coerce")
            tmp = tmp.dropna().sort_values(date_col)
            monthly = tmp.set_index(date_col)[value_col].resample("ME").mean().dropna()
            if len(monthly) < 2:
                return {}
            pct_change = float((monthly.iloc[-1] - monthly.iloc[0]) / monthly.iloc[0] * 100)
            return {
                "date_col": date_col,
                "value_col": value_col,
                "period_start": str(monthly.index[0].date()),
                "period_end": str(monthly.index[-1].date()),
                "start_value": round(float(monthly.iloc[0]), 4),
                "end_value": round(float(monthly.iloc[-1]), 4),
                "pct_change": round(pct_change, 2),
                "direction": "up" if pct_change > 0 else "down",
                "monthly_data": [
                    {"date": str(d.date()), "value": round(float(v), 4)}
                    for d, v in monthly.items()
                ]
            }
        except Exception:
            return {}

    def detect_anomalies(self, df: pd.DataFrame) -> dict:
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        if not numeric_cols:
            return {"error": "No numeric columns found for anomaly detection"}

        X = df[numeric_cols].fillna(df[numeric_cols].median())
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        iso = IsolationForest(contamination=0.05, random_state=42)
        labels = iso.fit_predict(X_scaled)
        scores = iso.score_samples(X_scaled)

        anomaly_indices = np.where(labels == -1)[0].tolist()
        return {
            "total_anomalies": len(anomaly_indices),
            "anomaly_pct": round(len(anomaly_indices) / len(df) * 100, 2),
            "anomaly_indices": anomaly_indices[:50],
            "anomaly_rows": df.iloc[anomaly_indices[:20]].replace({np.nan: None}).to_dict(orient="records"),
            "anomaly_scores": [round(float(s), 4) for s in scores[:100]],
        }

    def correlation(self, df: pd.DataFrame, cols: Optional[list] = None) -> dict:
        if cols is None:
            cols = df.select_dtypes(include=[np.number]).columns.tolist()
        if len(cols) < 2:
            return {}
        corr = df[cols].corr().round(4)
        return corr.replace({np.nan: None}).to_dict()
