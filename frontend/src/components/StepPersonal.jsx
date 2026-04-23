import React from 'react';
import { SliderField, RadioField, SelectField, StepperField, SectionHeader } from './FormFields';

export default function StepPersonal({ form, update }) {
  return (
    <div>
      <SectionHeader label="Basic Info" />
      <div className="field-group two-col" style={{ marginBottom: '1.25rem' }}>
        <SliderField
          label="Age"
          value={form.age}
          min={18}
          max={80}
          unit=" yrs"
          ticks={['18', '30', '45', '60', '80']}
          onChange={v => update('age', v)}
        />
        <StepperField
          label="Dependants"
          tooltip="Number of family members covered under your policy"
          value={form.number_of_dependants}
          min={0}
          max={8}
          onChange={v => update('number_of_dependants', v)}
        />
      </div>

      <SectionHeader label="Identity" />
      <div className="field-group two-col" style={{ marginBottom: '1.25rem' }}>
        <RadioField
          label="Gender"
          value={form.gender}
          options={[
            { value: 'Male', label: 'Male', icon: '♂' },
            { value: 'Female', label: 'Female', icon: '♀' },
          ]}
          onChange={v => update('gender', v)}
        />
        <RadioField
          label="Marital Status"
          value={form.marital_status}
          options={[
            { value: 'Unmarried', label: 'Single' },
            { value: 'Married', label: 'Married' },
          ]}
          onChange={v => update('marital_status', v)}
        />
      </div>

      <SectionHeader label="Location" />
      <div>
        <div className="field-label" style={{ marginBottom: '0.5rem' }}>Region</div>
        <div className="region-grid">
          {['Northeast', 'Northwest', 'Southeast', 'Southwest'].map(r => (
            <div
              key={r}
              className={`region-option ${form.region === r ? 'selected' : ''}`}
              onClick={() => update('region', r)}
            >
              <div className="region-dot" />
              <span className="region-name">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
