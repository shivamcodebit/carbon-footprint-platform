/**
 * Emission Factors & Constants
 *
 * Sources:
 * - UK DEFRA 2024 conversion factors for transport
 * - EPA Greenhouse Gas Equivalencies
 * - IPCC dietary emissions research
 *
 * All values in kg CO₂ equivalent.
 */

/** Transport emission factors (kg CO₂ per km) */
export const TRANSPORT_FACTORS = Object.freeze({
  car: 0.21,
  bike: 0.113,
  publicTransport: 0.089,
});

/** Electricity emission factor (kg CO₂ per kWh) — global weighted average */
export const ELECTRICITY_FACTOR = 0.475;

/**
 * Approximate conversion: electricity bill (INR) to kWh.
 * Based on average Indian residential tariff (~₹8/kWh).
 */
export const BILL_TO_KWH_DIVISOR = 8;

/** Monthly diet emissions (kg CO₂/month) by diet type */
export const DIET_EMISSIONS = Object.freeze({
  'meat-heavy': 150,
  average: 125,
  vegetarian: 100,
  vegan: 70,
});

/** Labels for display purposes */
export const DIET_LABELS = Object.freeze({
  'meat-heavy': 'Meat-Heavy',
  average: 'Average',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
});

/** Category metadata for display */
export const CATEGORY_META = Object.freeze({
  travel: { label: 'Travel', color: '#3b82f6', icon: 'Car' },
  energy: { label: 'Energy', color: '#f59e0b', icon: 'Zap' },
  diet: { label: 'Diet', color: '#10b981', icon: 'Utensils' },
});

/** Global benchmarks (kg CO₂/month) for comparison */
export const BENCHMARKS = Object.freeze({
  global: 375,
  india: 158,
  usa: 1250,
  eu: 542,
  target: 167,
});

export const BENCHMARK_LABELS = Object.freeze({
  global: 'Global Average',
  india: 'India Average',
  usa: 'USA Average',
  eu: 'EU Average',
  target: '2050 Target',
});
