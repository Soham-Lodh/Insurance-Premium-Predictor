import React, { useState, useCallback } from "react";
import "./App.css";
import StepPersonal from "./components/StepPersonal";
import StepHealth from "./components/StepHealth";
import StepFinancial from "./components/StepFinancial";
import StepPolicy from "./components/StepPolicy";
import ResultPanel from "./components/ResultPanel";
import ProgressBar from "./components/ProgressBar";
import { useEffect } from "react";
const STEPS = [
  { id: 1, label: "Personal", icon: "👤" },
  { id: 2, label: "Health", icon: "🏥" },
  { id: 3, label: "Financial", icon: "💰" },
  { id: 4, label: "Policy", icon: "📋" },
];

const INITIAL_FORM = {
  age: 30,
  gender: "Male",
  marital_status: "Unmarried",
  number_of_dependants: 0,
  income_lakhs: 10,
  employment_status: "Salaried",
  bmi_category: "Normal",
  smoking_status: "No Smoking",
  physical_activity: "Medium",
  stress_level: "Low",
  medical_history: "No Disease",
  insurance_plan: "Silver",
  region: "Northeast",
};

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        let errMsg = "Prediction failed";
        try {
          const err = await res.json();
          errMsg = err.detail || errMsg;
        } catch {}
        throw new Error(errMsg);
      }
      const data = await res.json();
      setResult(data);
      setShowResult(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const wakeUpServer = async () => {
      for (let i = 0; i < 3; i++) {
        try {
          await fetch(`${process.env.REACT_APP_API_URL}/health`);
          break;
        } catch {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    };

    wakeUpServer();
  }, []);
  const reset = () => {
    setShowResult(false);
    setResult(null);
    setStep(1);
    setForm(INITIAL_FORM);
  };

  if (showResult && result) {
    return <ResultPanel result={result} form={form} onReset={reset} />;
  }

  return (
    <div className="app-shell">
      {/* Background elements */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="brand">
            <div className="brand-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L3 7V12C3 16.55 7.08 20.74 12 22C16.92 20.74 21 16.55 21 12V7L12 2Z"
                  fill="currentColor"
                  opacity="0.15"
                />
                <path
                  d="M12 2L3 7V12C3 16.55 7.08 20.74 12 22C16.92 20.74 21 16.55 21 12V7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">PremiumIQ</span>
              <span className="brand-tag">AI-Powered Insurance Predictor</span>
            </div>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            XGBoost · 99.4% Accuracy
          </div>
        </header>

        {/* Hero */}
        <div className="hero-section">
          <h1 className="hero-title">
            Know Your Premium
            <br />
            <span className="hero-accent">Before You Buy</span>
          </h1>
          <p className="hero-sub">
            Get an instant, AI-powered estimate of your annual health insurance
            premium based on your unique health and lifestyle profile.
          </p>
        </div>

        {/* Progress */}
        <ProgressBar steps={STEPS} current={step} />

        {/* Form card */}
        <div className="form-card">
          <div className="form-card-header">
            <div className="step-indicator">
              <span className="step-icon">{STEPS[step - 1].icon}</span>
              <div>
                <div className="step-title">{STEPS[step - 1].label}</div>
                <div className="step-subtitle">Step {step} of 4</div>
              </div>
            </div>
          </div>

          <div className="form-body">
            {step === 1 && <StepPersonal form={form} update={update} />}
            {step === 2 && <StepHealth form={form} update={update} />}
            {step === 3 && <StepFinancial form={form} update={update} />}
            {step === 4 && <StepPolicy form={form} update={update} />}
          </div>

          {error && (
            <div className="error-banner">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-footer">
            {step > 1 && (
              <button className="btn btn-ghost" onClick={back}>
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button className="btn btn-primary" onClick={next}>
                Continue →
              </button>
            ) : (
              <button
                className="btn btn-submit"
                onClick={submit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Get My Premium Estimate
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <footer className="app-footer">
          <p>
            Estimates are for informational purposes only. Actual premiums may
            vary.
          </p>
        </footer>
      </div>
    </div>
  );
}
