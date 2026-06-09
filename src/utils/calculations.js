/**
 * Carbon Footprint Calculation Utilities
 *
 * Pure functions with zero side effects — fully unit-testable.
 * Each function validates inputs, clamps negatives to zero,
 * and returns results rounded to 1 decimal place.
 */

import {
  TRANSPORT_FACTORS,
  ELECTRICITY_FACTOR,
  BILL_TO_KWH_DIVISOR,
  DIET_EMISSIONS,
} from '../constants/emissionFactors';

/**
 * Sanitize a numeric input: returns 0 for NaN, negative, or non-finite values.
 * @param {*} value — raw input
 * @returns {number}
 */
const sanitize = (value) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : 0;
};

/**
 * Round to one decimal place.
 * @param {number} value
 * @returns {number}
 */
const round1 = (value) => Math.round(value * 10) / 10;

/**
 * Calculate monthly travel emissions.
 *
 * @param {number} carKm — km traveled by car per month
 * @param {number} bikeKm — km traveled by motorcycle per month
 * @param {number} publicKm — km traveled by public transport per month
 * @returns {number} kg CO₂/month
 */
export function calculateTravelEmissions(carKm = 0, bikeKm = 0, publicKm = 0) {
  const car = sanitize(carKm) * TRANSPORT_FACTORS.car;
  const bike = sanitize(bikeKm) * TRANSPORT_FACTORS.bike;
  const pub = sanitize(publicKm) * TRANSPORT_FACTORS.publicTransport;
  return round1(car + bike + pub);
}

/**
 * Calculate monthly energy emissions.
 *
 * @param {number} amount — kWh consumed or bill amount (in INR)
 * @param {'kwh'|'bill'} inputType — whether amount is direct kWh or a bill
 * @returns {number} kg CO₂/month
 */
export function calculateEnergyEmissions(amount = 0, inputType = 'kwh') {
  const sanitized = sanitize(amount);
  const kwh = inputType === 'bill'
    ? sanitized / BILL_TO_KWH_DIVISOR
    : sanitized;
  return round1(kwh * ELECTRICITY_FACTOR);
}

/**
 * Calculate monthly diet emissions.
 *
 * @param {string} dietType — one of 'meat-heavy', 'average', 'vegetarian', 'vegan'
 * @returns {number} kg CO₂/month
 */
export function calculateDietEmissions(dietType = 'average') {
  const emission = DIET_EMISSIONS[dietType];
  return emission !== undefined ? emission : DIET_EMISSIONS.average;
}

/**
 * Calculate complete emissions breakdown.
 *
 * @param {Object} inputs — all user inputs
 * @param {number} inputs.carKm
 * @param {number} inputs.bikeKm
 * @param {number} inputs.publicKm
 * @param {number} inputs.energyAmount
 * @param {'kwh'|'bill'} inputs.energyType
 * @param {string} inputs.dietType
 * @returns {{ travel: number, energy: number, diet: number, total: number }}
 */
export function calculateTotalEmissions(inputs) {
  const travel = calculateTravelEmissions(
    inputs.carKm,
    inputs.bikeKm,
    inputs.publicKm
  );
  const energy = calculateEnergyEmissions(
    inputs.energyAmount,
    inputs.energyType
  );
  const diet = calculateDietEmissions(inputs.dietType);
  const total = round1(travel + energy + diet);

  return { travel, energy, diet, total };
}

/**
 * Identify the highest-emitting category.
 *
 * @param {{ travel: number, energy: number, diet: number }} breakdown
 * @returns {string} — 'travel', 'energy', or 'diet'
 */
export function getHighestCategory(breakdown) {
  const { travel, energy, diet } = breakdown;
  if (travel >= energy && travel >= diet) return 'travel';
  if (energy >= travel && energy >= diet) return 'energy';
  return 'diet';
}

/**
 * Get percentage breakdown of emissions.
 *
 * @param {{ travel: number, energy: number, diet: number, total: number }} emissions
 * @returns {{ travel: number, energy: number, diet: number }}
 */
export function getPercentages(emissions) {
  const { travel, energy, diet, total } = emissions;
  if (total === 0) return { travel: 0, energy: 0, diet: 0 };
  return {
    travel: round1((travel / total) * 100),
    energy: round1((energy / total) * 100),
    diet: round1((diet / total) * 100),
  };
}
