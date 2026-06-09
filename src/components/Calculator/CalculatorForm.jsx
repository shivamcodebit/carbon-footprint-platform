import React from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import TravelSection from './TravelSection';
import EnergySection from './EnergySection';
import DietSection from './DietSection';

/**
 * CalculatorForm — Main form component that composes all input sections.
 * Uses semantic <form> element with accessible submit handling.
 */
export default function CalculatorForm({ inputs, onUpdate, onCalculate, onReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <section className="calculator" aria-labelledby="calculator-heading">
      <div className="section-header">
        <div className="section-icon results" aria-hidden="true">
          <Calculator size={20} />
        </div>
        <div>
          <h2 className="section-title" id="calculator-heading">
            Carbon Calculator
          </h2>
          <p className="section-description">
            Enter your monthly habits to estimate your carbon footprint
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <TravelSection inputs={inputs} onUpdate={onUpdate} />
          <EnergySection inputs={inputs} onUpdate={onUpdate} />
          <DietSection inputs={inputs} onUpdate={onUpdate} />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            id="calculate-btn"
            aria-label="Calculate my carbon footprint"
          >
            <Calculator size={18} aria-hidden="true" />
            Calculate Footprint
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onReset}
            id="reset-btn"
            aria-label="Reset all inputs"
          >
            <RotateCcw size={18} aria-hidden="true" />
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
