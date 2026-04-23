import React from 'react';
import { SliderField, RadioField, SectionHeader } from './FormFields';

export default function StepFinancial({ form, update }) {
  return (
    <div>
      <SectionHeader label="Income" />
      <div style={{ marginBottom: '1.25rem' }}>
        <SliderField
          label="Annual Income"
          tooltip="Your total annual income in Indian Rupees (Lakhs)"
          value={form.income_lakhs}
          min={1}
          max={100}
          step={1}
          unit=" L"
          ticks={['₹1L', '₹25L', '₹50L', '₹75L', '₹100L']}
          onChange={v => update('income_lakhs', v)}
        />
      </div>

      <SectionHeader label="Employment" />
      <RadioField
        label="Employment Status"
        value={form.employment_status}
        options={[
          { value: 'Salaried', label: '🏢 Salaried', icon: null },
          { value: 'Self-Employed', label: '💼 Self-Employed', icon: null },
          { value: 'Freelancer', label: '💻 Freelancer', icon: null },
        ]}
        onChange={v => update('employment_status', v)}
      />

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--c-gradient-soft)', borderRadius: 'var(--r-md)', border: '1px solid rgba(37,99,235,0.1)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-primary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          💡 Did you know?
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--c-text-2)', lineHeight: 1.6 }}>
          Income level is used by insurers as a proxy for healthcare access and risk tolerance. Higher income can sometimes mean access to better preventive care.
        </div>
      </div>
    </div>
  );
}
