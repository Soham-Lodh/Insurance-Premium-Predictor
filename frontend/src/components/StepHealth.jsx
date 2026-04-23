import React from 'react';
import { SelectField, ToggleField, RadioField, SectionHeader } from './FormFields';

const MEDICAL_OPTIONS = [
  { value: 'No Disease', label: '🟢 No Disease' },

  { value: 'Diabetes', label: '🩺 Diabetes' },
  { value: 'High blood pressure', label: '🫀 High Blood Pressure' },
  { value: 'Thyroid', label: '🦋 Thyroid' },
  { value: 'Heart disease', label: '❤️‍🩹 Heart Disease' },
  { value: 'Diabetes & High blood pressure', label: '🩺 + 🫀 Diabetes + HBP' },
  { value: 'High blood pressure & Heart disease', label: '🫀 + ❤️‍🩹 HBP + Heart' },
  { value: 'Diabetes & Thyroid', label: '🩺 + 🦋 Diabetes + Thyroid' },
  { value: 'Diabetes & Heart disease', label: '🩺 + ❤️‍🩹 Diabetes + Heart' },
];

export default function StepHealth({ form, update }) {
  return (
    <div>
      <SectionHeader label="Body Metrics" />
      <div className="field-group two-col" style={{ marginBottom: '1.25rem' }}>
        <SelectField
          label="BMI Category"
          tooltip="Body Mass Index: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obesity (30+)"
          value={form.bmi_category}
          options={['Normal', 'Underweight', 'Overweight', 'Obesity']}
          onChange={v => update('bmi_category', v)}
        />
        <ToggleField
          label="Smoking Status"
          value={form.smoking_status}
          options={[
            { value: 'No Smoking', label: '🚭 None' },
            { value: 'Occasional', label: '🚬 Occasional' },
            { value: 'Regular', label: '🔥 Regular' },
          ]}
          onChange={v => update('smoking_status', v)}
        />
      </div>

      <SectionHeader label="Lifestyle" />
      <div className="field-group two-col" style={{ marginBottom: '1.25rem' }}>
        <RadioField
          label="Physical Activity"
          tooltip="How often do you exercise or engage in physical activities?"
          value={form.physical_activity}
          options={[
            { value: 'Low', label: '🧘 Low' },
            { value: 'Medium', label: '🚶 Medium' },
            { value: 'High', label: '🏃 High' },
          ]}
          onChange={v => update('physical_activity', v)}
        />
        <RadioField
          label="Stress Level"
          tooltip="Your average daily stress level at work and in personal life"
          value={form.stress_level}
          options={[
            { value: 'Low', label: '😌 Low' },
            { value: 'Medium', label: '😐 Medium' },
            { value: 'High', label: '😰 High' },
          ]}
          onChange={v => update('stress_level', v)}
        />
      </div>

      <SectionHeader label="Medical History" />
      <div className="field">
        <label className="field-label">
          Pre-existing Conditions
          <span className="field-tooltip" data-tip="Compound conditions accumulate risk scores, significantly affecting your premium">?</span>
        </label>
        <div className="medical-options">
          {MEDICAL_OPTIONS.map(opt => (
            <div
              key={opt.value}
              className={`medical-tag ${form.medical_history === opt.value ? 'selected' : ''}`}
              onClick={() => update('medical_history', opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
