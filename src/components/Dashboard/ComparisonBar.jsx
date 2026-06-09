import React from 'react';
import { BENCHMARKS, BENCHMARK_LABELS } from '../../constants/emissionFactors';

/**
 * ComparisonBar — Visualizes user's footprint against global benchmarks.
 * Each bar is normalized to the max benchmark for proportional display.
 */
export default function ComparisonBar({ userTotal }) {
  const allValues = [...Object.values(BENCHMARKS), userTotal];
  const maxValue = Math.max(...allValues, 1);

  const items = [
    { key: 'you', label: 'Your Footprint', value: userTotal, isUser: true },
    ...Object.entries(BENCHMARKS).map(([key, value]) => ({
      key,
      label: BENCHMARK_LABELS[key],
      value,
      isUser: false,
    })),
  ];

  return (
    <div className="comparison" aria-label="Footprint comparison with global benchmarks">
      <h3 className="comparison-title">How You Compare</h3>
      {items.map(({ key, label, value, isUser }) => {
        const widthPercent = (value / maxValue) * 100;
        const className = isUser ? 'you' : key === 'target' ? 'target' : '';

        return (
          <div className="comparison-item" key={key}>
            <div className="comparison-item-header">
              <span className="comparison-item-label">
                {isUser ? <strong>{label}</strong> : label}
              </span>
              <span className="comparison-item-value">{value} kg/mo</span>
            </div>
            <div
              className="comparison-bar-track"
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={`${label}: ${value} kg CO₂ per month`}
            >
              <div
                className={`comparison-bar-fill ${className}`}
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
