# PremiumIQ — Health Insurance Premium Predictor

A full-stack web app wrapping your XGBoost ML model in a polished, production-grade UI.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Recharts, CSS Variables |
| Backend | FastAPI + Uvicorn |
| ML | XGBoost (your existing model.joblib + scaler.joblib) |
| Deployment | Docker Compose + Nginx |

---

## Quick Start (Docker — Recommended)

```bash
# 1. Clone / copy this project
cd insurance-app

# 2. Copy your ML artifacts into backend/artifacts/
cp /path/to/your/model.joblib  backend/artifacts/model.joblib
cp /path/to/your/scaler.joblib backend/artifacts/scaler.joblib

# 3. Start everything
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Local Development (No Docker)

### Backend

```bash
cd backend

# Create artifacts directory and copy your model files
mkdir -p artifacts
cp /path/to/model.joblib  artifacts/
cp /path/to/scaler.joblib artifacts/

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
# API calls are proxied to http://localhost:8000 via package.json "proxy" field
```

---

## Project Structure

```
insurance-app/
├── backend/
│   ├── main.py              # FastAPI app — prediction endpoint + preprocessing
│   ├── requirements.txt
│   ├── Dockerfile
│   └── artifacts/           # ← PUT YOUR MODEL FILES HERE
│       ├── model.joblib
│       └── scaler.joblib
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Multi-step form shell
│   │   ├── App.css          # Full design system
│   │   └── components/
│   │       ├── ProgressBar.jsx
│   │       ├── FormFields.jsx   # Reusable slider/toggle/radio/stepper
│   │       ├── StepPersonal.jsx
│   │       ├── StepHealth.jsx
│   │       ├── StepFinancial.jsx
│   │       ├── StepPolicy.jsx
│   │       └── ResultPanel.jsx  # Result + charts + download
│   ├── public/index.html
│   ├── nginx.conf           # Proxies /predict → backend:8000
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

## API

### POST /predict

**Request:**
```json
{
  "age": 35,
  "gender": "Male",
  "marital_status": "Married",
  "number_of_dependants": 2,
  "income_lakhs": 15,
  "employment_status": "Salaried",
  "bmi_category": "Normal",
  "smoking_status": "No Smoking",
  "physical_activity": "High",
  "stress_level": "Low",
  "medical_history": "No Disease",
  "insurance_plan": "Silver",
  "region": "Northeast"
}
```

**Response:**
```json
{
  "annual_premium": 12450.75,
  "monthly_premium": 1037.56,
  "risk_score": 0,
  "risk_label": "Low",
  "risk_factors": [{"factor": "No significant risk factors", "impact": "low", "icon": "✅"}],
  "confidence_band": {"low": 11454.69, "high": 13446.81}
}
```

---

## Key Design Decisions

1. **The `"proxy"` field in `package.json`** — routes all `/predict` calls from the dev server to FastAPI at port 8000. In production, Nginx handles the proxy.

2. **`scaler_obj['cols_to_scale']`** — your scaler.joblib stores both the fitted scaler AND the column names to scale. The backend replicates this exactly.

3. **Ordinal encoding** — the backend maps UI-friendly labels (`"No Smoking"`, `"Regular"`) to the exact integers used during training. Do NOT change these mappings.

4. **Medical history → risk score** — compound conditions like `"Diabetes & Heart disease"` are split on `" & "` and accumulated. This matches your `predictor.py` exactly.
