import React from 'react';
import { BarChart3, Sparkles } from 'lucide-react';
import EmissionCard from './EmissionCard';
import BreakdownChart from './BreakdownChart';
import ComparisonBar from './ComparisonBar';

/**
 * Dashboard — Aggregates all result visualizations.
 * Uses aria-live region so screen readers announce updates.
 */
export default function Dashboard({ emissions, percentages, insightSummary }) {
  const { travel, energy, diet, total } = emissions;

  return (
    <section
      className="dashboard"
      aria-labelledby="dashboard-heading"
      aria-live="polite"
    >
      <div className="section-header">
        <div className="section-icon results" aria-hidden="true">
          <BarChart3 size={20} />
        </div>
        <div>
          <h2 className="section-title" id="dashboard-heading">
            Your Carbon Footprint
          </h2>
          <p className="section-description">Breakdown of your monthly emissions</p>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="insight-card" role="status">
        <div className="insight-icon" aria-hidden="true">
          <Sparkles size={16} />
        </div>
        <p className="insight-text">{insightSummary}</p>
      </div>

      {/* Total + Chart */}
      <div className="total-card">
        <div className="total-card-left">
          <p className="total-card-label">Total Monthly Emissions</p>
          <p className="total-card-value" aria-label={`${total} kilograms CO₂ per month`}>
            {total.toLocaleString()}
          </p>
          <p className="total-card-unit">kg CO₂ / month</p>
        </div>
        <div className="total-card-right">
          <BreakdownChart emissions={emissions} />
        </div>
      </div>

      {/* Category Cards */}
      <div className="dashboard-grid">
        <EmissionCard
          category="travel"
          value={travel}
          percentage={percentages.travel}
          emissions={emissions}
        />
        <EmissionCard
          category="energy"
          value={energy}
          percentage={percentages.energy}
          emissions={emissions}
        />
        <EmissionCard
          category="diet"
          value={diet}
          percentage={percentages.diet}
          emissions={emissions}
        />
      </div>

      {/* Benchmark Comparison */}
      <ComparisonBar userTotal={total} />
    </section>
  );
}
