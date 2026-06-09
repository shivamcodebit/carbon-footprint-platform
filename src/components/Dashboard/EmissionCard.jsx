import React from 'react';
import { Car, Zap, Utensils } from 'lucide-react';
import { getHighestCategory } from '../../utils/calculations';

const ICONS = { travel: Car, energy: Zap, diet: Utensils };
const COLORS = { travel: 'travel', energy: 'energy', diet: 'diet' };
const LABELS = { travel: 'Travel', energy: 'Energy', diet: 'Diet' };

/**
 * EmissionCard — Displays a single category's emission value
 * with a progress bar showing its proportion of total.
 */
export default function EmissionCard({ category, value, percentage, emissions }) {
  const Icon = ICONS[category];
  const highest = getHighestCategory(emissions);
  const isHighest = category === highest && value > 0;

  return (
    <article
      className={`emission-card ${isHighest ? 'highlight' : ''}`}
      aria-label={`${LABELS[category]} emissions: ${value} kg CO₂ per month, ${percentage}% of total`}
    >
      <div className="emission-card-header">
        <div className={`emission-card-icon ${COLORS[category]}`} aria-hidden="true">
          <Icon size={20} />
        </div>
        {isHighest && (
          <span className="emission-card-badge" aria-label="Highest emitting category">
            Highest
          </span>
        )}
        {!isHighest && value > 0 && percentage < 20 && (
          <span className="emission-card-badge low" aria-label="Low emission category">
            Low
          </span>
        )}
      </div>
      <p className="emission-card-label">{LABELS[category]}</p>
      <p className="emission-card-value" aria-live="polite">
        {value.toLocaleString()}
      </p>
      <p className="emission-card-unit">kg CO₂/month &middot; {percentage}%</p>
      <div
        className="emission-card-bar"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${LABELS[category]} percentage: ${percentage}%`}
      >
        <div
          className={`emission-card-bar-fill ${COLORS[category]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </article>
  );
}
