import React from 'react';
import { Zap } from 'lucide-react';

/**
 * EnergySection — Input for electricity consumption (kWh or bill amount).
 * Includes a toggle to switch between input modes.
 */
export default function EnergySection({ inputs, onUpdate }) {
  const handleAmountChange = (e) => {
    onUpdate('energyAmount', e.target.value);
  };

  const handleTypeChange = (type) => () => {
    onUpdate('energyType', type);
    onUpdate('energyAmount', '');
  };

  const isKwh = inputs.energyType === 'kwh';

  return (
    <div className="form-section" role="group" aria-labelledby="energy-legend">
      <div className="section-header">
        <div className="section-icon energy" aria-hidden="true">
          <Zap size={20} />
        </div>
        <div>
          <h2 className="section-title" id="energy-legend">Energy</h2>
          <p className="section-description">Monthly electricity consumption</p>
        </div>
      </div>

      <div
        className="energy-toggle"
        role="radiogroup"
        aria-label="Energy input type"
      >
        <button
          type="button"
          className={`energy-toggle-btn ${isKwh ? 'active' : ''}`}
          onClick={handleTypeChange('kwh')}
          role="radio"
          aria-checked={isKwh}
          id="toggle-kwh"
        >
          kWh (Units)
        </button>
        <button
          type="button"
          className={`energy-toggle-btn ${!isKwh ? 'active' : ''}`}
          onClick={handleTypeChange('bill')}
          role="radio"
          aria-checked={!isKwh}
          id="toggle-bill"
        >
          Bill Amount (₹)
        </button>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="input-energy">
          <Zap size={16} aria-hidden="true" />
          {isKwh ? 'Electricity (kWh/month)' : 'Monthly Bill (₹)'}
        </label>
        <input
          id="input-energy"
          className="field-input"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          placeholder={isKwh ? 'e.g., 250' : 'e.g., 2000'}
          value={inputs.energyAmount}
          onChange={handleAmountChange}
          aria-describedby="energy-hint"
        />
        <p className="field-hint" id="energy-hint">
          {isKwh
            ? 'Average Indian household: ~250 kWh/month'
            : 'We\'ll estimate kWh at approx ₹8/unit'}
        </p>
      </div>
    </div>
  );
}
