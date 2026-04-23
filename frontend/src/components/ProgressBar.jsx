import React from 'react';

export default function ProgressBar({ steps, current }) {
  return (
    <div className="progress-bar">
      {steps.map((step) => {
        const isDone = step.id < current;
        const isActive = step.id === current;
        return (
          <div
            key={step.id}
            className={`progress-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
          >
            <div className="step-circle">
              {isDone ? '✓' : step.id}
            </div>
            <span className="step-label-text">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
