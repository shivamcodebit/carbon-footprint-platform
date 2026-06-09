/**
 * useCarbonCalculator — Custom hook for carbon footprint state management.
 *
 * Encapsulates all form state, derived calculations, and recommendations
 * using React.useMemo for optimal performance (recalculates only when inputs change).
 */

import { useState, useMemo, useCallback } from 'react';
import { calculateTotalEmissions, getPercentages } from '../utils/calculations';
import { getRecommendations, getInsightSummary } from '../utils/recommendations';

/** Default form state */
const INITIAL_INPUTS = Object.freeze({
  carKm: '',
  bikeKm: '',
  publicKm: '',
  energyAmount: '',
  energyType: 'kwh',
  dietType: 'average',
});

/**
 * @returns {{
 *   inputs: Object,
 *   updateInput: (field: string, value: any) => void,
 *   resetForm: () => void,
 *   emissions: { travel: number, energy: number, diet: number, total: number },
 *   percentages: { travel: number, energy: number, diet: number },
 *   recommendations: Array,
 *   insightSummary: string,
 *   hasCalculated: boolean,
 * }}
 */
export function useCarbonCalculator() {
  const [inputs, setInputs] = useState({ ...INITIAL_INPUTS });
  const [hasCalculated, setHasCalculated] = useState(false);

  /** Update a single input field */
  const updateInput = useCallback((field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Reset all inputs to defaults */
  const resetForm = useCallback(() => {
    setInputs({ ...INITIAL_INPUTS });
    setHasCalculated(false);
  }, []);

  /** Mark as calculated (triggered by form submit) */
  const calculate = useCallback(() => {
    setHasCalculated(true);
  }, []);

  /** Derived: emissions breakdown (recalculates only when inputs change) */
  const emissions = useMemo(
    () => calculateTotalEmissions(inputs),
    [inputs]
  );

  /** Derived: percentage breakdown */
  const percentages = useMemo(
    () => getPercentages(emissions),
    [emissions]
  );

  /** Derived: personalized recommendations */
  const recommendations = useMemo(
    () => getRecommendations(emissions),
    [emissions]
  );

  /** Derived: insight summary text */
  const insightSummary = useMemo(
    () => getInsightSummary(emissions),
    [emissions]
  );

  return {
    inputs,
    updateInput,
    resetForm,
    calculate,
    emissions,
    percentages,
    recommendations,
    insightSummary,
    hasCalculated,
  };
}
