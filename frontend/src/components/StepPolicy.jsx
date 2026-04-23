import React from 'react';
import { SectionHeader } from './FormFields';

const PLANS = [
  {
    value: 'Bronze',
    icon: '🥉',
    name: 'Bronze',
    desc: 'Basic coverage',
    features: ['Essential care', 'Emergency only', 'Low premium'],
  },
  {
    value: 'Silver',
    icon: '🥈',
    name: 'Silver',
    desc: 'Standard coverage',
    badge: 'Most Popular',
    features: ['Comprehensive', 'Hospitalization', 'Moderate premium'],
  },
  {
    value: 'Gold',
    icon: '🥇',
    name: 'Gold',
    desc: 'Premium coverage',
    features: ['Full coverage', 'OPD included', 'Premium plan'],
  },
];

export default function StepPolicy({ form, update }) {
  const selected = PLANS.find(p => p.value === form.insurance_plan);

  return (
    <div>
      <SectionHeader label="Insurance Plan" />
      <div className="plan-cards" style={{ marginBottom: '1.5rem' }}>
        {PLANS.map(plan => (
          <div
            key={plan.value}
            className={`plan-card ${form.insurance_plan === plan.value ? 'selected' : ''}`}
            onClick={() => update('insurance_plan', plan.value)}
          >
            {plan.badge && <div className="plan-card-badge">{plan.badge}</div>}
            <div className="plan-icon">{plan.icon}</div>
            <div className="plan-name">{plan.name}</div>
            <div className="plan-desc">{plan.desc}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{
          padding: '1rem',
          background: 'var(--c-gradient-soft)',
          borderRadius: 'var(--r-md)',
          border: '1px solid rgba(37,99,235,0.12)',
          marginBottom: '1.5rem',
          animation: 'fade-up 0.3s ease both',
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-primary)', marginBottom: '0.5rem' }}>
            {selected.icon} {selected.name} Plan Includes:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {selected.features.map(f => (
              <span key={f} style={{
                padding: '3px 10px',
                background: 'white',
                border: '1px solid rgba(37,99,235,0.15)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                color: 'var(--c-text-2)',
                fontWeight: 500,
              }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{
        padding: '1.125rem',
        background: '#fffbeb',
        borderRadius: 'var(--r-md)',
        border: '1px solid #fde68a',
      }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#d97706', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          ⚠️ Ready to Predict?
        </div>
        <div style={{ fontSize: '0.82rem', color: '#92400e', lineHeight: 1.6 }}>
          Once you click <strong>Get My Premium Estimate</strong>, our XGBoost model will analyze your profile across 18 features to compute your personalized estimate.
        </div>
      </div>
    </div>
  );
}
