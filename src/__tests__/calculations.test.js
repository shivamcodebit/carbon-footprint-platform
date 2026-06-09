/**
 * Unit Tests — Carbon Footprint Calculation Logic
 *
 * Tests all pure calculation functions for correctness,
 * edge cases, and input sanitization.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateTravelEmissions,
  calculateEnergyEmissions,
  calculateDietEmissions,
  calculateTotalEmissions,
  getHighestCategory,
  getPercentages,
} from '../utils/calculations';

describe('calculateTravelEmissions', () => {
  it('should calculate car emissions correctly', () => {
    // 500 km × 0.21 = 105
    expect(calculateTravelEmissions(500, 0, 0)).toBe(105);
  });

  it('should calculate bike emissions correctly', () => {
    // 200 km × 0.113 = 22.6
    expect(calculateTravelEmissions(0, 200, 0)).toBe(22.6);
  });

  it('should calculate public transport emissions correctly', () => {
    // 300 km × 0.089 = 26.7
    expect(calculateTravelEmissions(0, 0, 300)).toBe(26.7);
  });

  it('should sum all transport modes', () => {
    // 500*0.21 + 200*0.113 + 300*0.089 = 105 + 22.6 + 26.7 = 154.3
    expect(calculateTravelEmissions(500, 200, 300)).toBe(154.3);
  });

  it('should return 0 for zero inputs', () => {
    expect(calculateTravelEmissions(0, 0, 0)).toBe(0);
  });

  it('should return 0 for no arguments', () => {
    expect(calculateTravelEmissions()).toBe(0);
  });

  it('should handle negative values as 0', () => {
    expect(calculateTravelEmissions(-100, 0, 0)).toBe(0);
  });

  it('should handle NaN values as 0', () => {
    expect(calculateTravelEmissions(NaN, 0, 0)).toBe(0);
  });

  it('should handle string values', () => {
    expect(calculateTravelEmissions('500', 0, 0)).toBe(105);
  });

  it('should handle empty string as 0', () => {
    expect(calculateTravelEmissions('', 0, 0)).toBe(0);
  });
});

describe('calculateEnergyEmissions', () => {
  it('should calculate kWh-based emissions correctly', () => {
    // 250 kWh × 0.475 = 118.8
    expect(calculateEnergyEmissions(250, 'kwh')).toBe(118.8);
  });

  it('should calculate bill-based emissions correctly', () => {
    // 2000 ÷ 8 = 250 kWh → 250 × 0.475 = 118.8
    expect(calculateEnergyEmissions(2000, 'bill')).toBe(118.8);
  });

  it('should return 0 for zero input', () => {
    expect(calculateEnergyEmissions(0, 'kwh')).toBe(0);
  });

  it('should default to kwh input type', () => {
    expect(calculateEnergyEmissions(100)).toBe(47.5);
  });

  it('should handle negative values as 0', () => {
    expect(calculateEnergyEmissions(-500, 'kwh')).toBe(0);
  });

  it('should handle very large values', () => {
    const result = calculateEnergyEmissions(10000, 'kwh');
    expect(result).toBe(4750);
  });
});

describe('calculateDietEmissions', () => {
  it('should return correct value for meat-heavy diet', () => {
    expect(calculateDietEmissions('meat-heavy')).toBe(150);
  });

  it('should return correct value for average diet', () => {
    expect(calculateDietEmissions('average')).toBe(125);
  });

  it('should return correct value for vegetarian diet', () => {
    expect(calculateDietEmissions('vegetarian')).toBe(100);
  });

  it('should return correct value for vegan diet', () => {
    expect(calculateDietEmissions('vegan')).toBe(70);
  });

  it('should default to average for unknown diet type', () => {
    expect(calculateDietEmissions('unknown')).toBe(125);
  });

  it('should default to average when no argument provided', () => {
    expect(calculateDietEmissions()).toBe(125);
  });
});

describe('calculateTotalEmissions', () => {
  it('should calculate total emissions from all categories', () => {
    const result = calculateTotalEmissions({
      carKm: 500,
      bikeKm: 0,
      publicKm: 0,
      energyAmount: 250,
      energyType: 'kwh',
      dietType: 'vegetarian',
    });

    expect(result.travel).toBe(105);
    expect(result.energy).toBe(118.8);
    expect(result.diet).toBe(100);
    expect(result.total).toBe(323.8);
  });

  it('should handle all-zero inputs', () => {
    const result = calculateTotalEmissions({
      carKm: 0,
      bikeKm: 0,
      publicKm: 0,
      energyAmount: 0,
      energyType: 'kwh',
      dietType: 'vegan',
    });

    expect(result.travel).toBe(0);
    expect(result.energy).toBe(0);
    expect(result.diet).toBe(70);
    expect(result.total).toBe(70);
  });

  it('should handle empty string inputs (form defaults)', () => {
    const result = calculateTotalEmissions({
      carKm: '',
      bikeKm: '',
      publicKm: '',
      energyAmount: '',
      energyType: 'kwh',
      dietType: 'average',
    });

    expect(result.travel).toBe(0);
    expect(result.energy).toBe(0);
    expect(result.diet).toBe(125);
    expect(result.total).toBe(125);
  });
});

describe('getHighestCategory', () => {
  it('should identify travel as highest', () => {
    expect(getHighestCategory({ travel: 200, energy: 100, diet: 50 })).toBe('travel');
  });

  it('should identify energy as highest', () => {
    expect(getHighestCategory({ travel: 50, energy: 200, diet: 100 })).toBe('energy');
  });

  it('should identify diet as highest', () => {
    expect(getHighestCategory({ travel: 50, energy: 100, diet: 200 })).toBe('diet');
  });

  it('should return travel on tie between travel and energy', () => {
    expect(getHighestCategory({ travel: 100, energy: 100, diet: 50 })).toBe('travel');
  });

  it('should handle all zeros', () => {
    const result = getHighestCategory({ travel: 0, energy: 0, diet: 0 });
    expect(['travel', 'energy', 'diet']).toContain(result);
  });
});

describe('getPercentages', () => {
  it('should calculate correct percentages', () => {
    const result = getPercentages({ travel: 50, energy: 30, diet: 20, total: 100 });
    expect(result.travel).toBe(50);
    expect(result.energy).toBe(30);
    expect(result.diet).toBe(20);
  });

  it('should return zeros when total is 0', () => {
    const result = getPercentages({ travel: 0, energy: 0, diet: 0, total: 0 });
    expect(result.travel).toBe(0);
    expect(result.energy).toBe(0);
    expect(result.diet).toBe(0);
  });

  it('should handle uneven distributions', () => {
    const result = getPercentages({ travel: 1, energy: 1, diet: 1, total: 3 });
    expect(result.travel).toBe(33.3);
    expect(result.energy).toBe(33.3);
    expect(result.diet).toBe(33.3);
  });
});
