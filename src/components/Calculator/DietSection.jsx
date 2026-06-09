import React from 'react';
import { Utensils } from 'lucide-react';
import { DIET_EMISSIONS, DIET_LABELS } from '../../constants/emissionFactors';

/**
 * DietSection — Radio group for selecting diet type.
 * Each option shows an emoji and the associated monthly CO₂ value.
 */

const DIET_EMOJIS = {
  'meat-heavy': '🥩',
  average: '🍽️',
  vegetarian: '🥗',
  vegan: '🌱',
};

export default function DietSection({ inputs, onUpdate }) {
  const handleChange = (e) => {
    onUpdate('dietType', e.target.value);
  };

  return (
    <div className="form-section full" role="group" aria-labelledby="diet-legend">
      <div className="section-header">
        <div className="section-icon diet" aria-hidden="true">
          <Utensils size={20} />
        </div>
        <div>
          <h2 className="section-title" id="diet-legend">Diet</h2>
          <p className="section-description">Select your typical dietary pattern</p>
        </div>
      </div>

      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend className="sr-only">Diet type selection</legend>
        <div className="diet-options" role="radiogroup" aria-label="Diet type">
          {Object.keys(DIET_EMISSIONS).map((type) => (
            <div className="diet-option" key={type}>
              <input
                type="radio"
                name="diet-type"
                id={`diet-${type}`}
                value={type}
                checked={inputs.dietType === type}
                onChange={handleChange}
              />
              <label htmlFor={`diet-${type}`}>
                <span className="diet-emoji" aria-hidden="true">
                  {DIET_EMOJIS[type]}
                </span>
                <span className="diet-name">{DIET_LABELS[type]}</span>
                <span className="diet-co2">{DIET_EMISSIONS[type]} kg CO₂/mo</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
