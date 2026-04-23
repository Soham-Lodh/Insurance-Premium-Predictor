import React from 'react';

export function SliderField({ label, tooltip, value, min, max, step = 1, unit, ticks, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="field">
      <label className="field-label">
        {label}
        {tooltip && (
          <span className="field-tooltip" data-tip={tooltip}>?</span>
        )}
      </label>
      <div className="slider-wrapper">
        <div className="slider-display">
          <span className="slider-value">
            {value}{unit && <span className="slider-unit">{unit}</span>}
          </span>
        </div>
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ '--pct': `${pct}%` }}
          onChange={e => onChange(Number(e.target.value))}
        />
        {ticks && (
          <div className="slider-ticks">
            {ticks.map(t => <span key={t} className="slider-tick">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

export function SelectField({ label, tooltip, value, options, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {label}
        {tooltip && <span className="field-tooltip" data-tip={tooltip}>?</span>}
      </label>
      <div className="select-wrapper">
        <select
          className="select"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(opt => (
            typeof opt === 'string'
              ? <option key={opt} value={opt}>{opt}</option>
              : <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function RadioField({ label, tooltip, value, options, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {label}
        {tooltip && <span className="field-tooltip" data-tip={tooltip}>?</span>}
      </label>
      <div className="radio-group">
        {options.map(opt => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          const icon = typeof opt === 'object' ? opt.icon : null;
          return (
            <label key={val} className="radio-option">
              <input
                type="radio"
                name={label}
                value={val}
                checked={value === val}
                onChange={() => onChange(val)}
              />
              <span className="radio-label">
                {icon && <span>{icon}</span>}
                {lbl}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function ToggleField({ label, tooltip, value, options, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {label}
        {tooltip && <span className="field-tooltip" data-tip={tooltip}>?</span>}
      </label>
      <div className="toggle-wrapper">
        {options.map(opt => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <button
              key={val}
              type="button"
              className={`toggle-option ${value === val ? 'active' : ''}`}
              onClick={() => onChange(val)}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StepperField({ label, tooltip, value, min = 0, max = 10, onChange }) {
  return (
    <div className="field">
      <label className="field-label">
        {label}
        {tooltip && <span className="field-tooltip" data-tip={tooltip}>?</span>}
      </label>
      <div className="stepper">
        <button
          type="button"
          className="stepper-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          −
        </button>
        <span className="stepper-value">{value}</span>
        <button
          type="button"
          className="stepper-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function SectionHeader({ label }) {
  return (
    <div className="section-header">
      <div className="section-line" />
      <span className="section-label">{label}</span>
      <div className="section-line" />
    </div>
  );
}
