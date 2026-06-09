import React from 'react';
import { Car, Bike, TrainFront } from 'lucide-react';

/**
 * TravelSection — Inputs for monthly travel distances by transport mode.
 * Uses <fieldset> and <legend> for accessible grouping.
 */
export default function TravelSection({ inputs, onUpdate }) {
  const handleChange = (field) => (e) => {
    onUpdate(field, e.target.value);
  };

  return (
    <div className="form-section" role="group" aria-labelledby="travel-legend">
      <div className="section-header">
        <div className="section-icon travel" aria-hidden="true">
          <Car size={20} />
        </div>
        <div>
          <h2 className="section-title" id="travel-legend">Travel</h2>
          <p className="section-description">Monthly distance by transport mode</p>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="input-car-km">
          <Car size={16} aria-hidden="true" />
          Car (km/month)
        </label>
        <input
          id="input-car-km"
          className="field-input"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          placeholder="e.g., 500"
          value={inputs.carKm}
          onChange={handleChange('carKm')}
          aria-describedby="car-hint"
        />
        <p className="field-hint" id="car-hint">
          Average Indian car commuter: ~600 km/month
        </p>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="input-bike-km">
          <Bike size={16} aria-hidden="true" />
          Motorcycle / Bike (km/month)
        </label>
        <input
          id="input-bike-km"
          className="field-input"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          placeholder="e.g., 200"
          value={inputs.bikeKm}
          onChange={handleChange('bikeKm')}
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="input-public-km">
          <TrainFront size={16} aria-hidden="true" />
          Public Transport (km/month)
        </label>
        <input
          id="input-public-km"
          className="field-input"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          placeholder="e.g., 300"
          value={inputs.publicKm}
          onChange={handleChange('publicKm')}
        />
      </div>
    </div>
  );
}
