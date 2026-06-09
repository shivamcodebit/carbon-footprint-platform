/**
 * Unit Tests — Recommendation Engine
 *
 * Tests that recommendations are personalized based on
 * the highest-emitting category and always return results.
 */

import { describe, it, expect } from 'vitest';
import { getRecommendations, getInsightSummary } from '../utils/recommendations';

describe('getRecommendations', () => {
  it('should return recommendations array', () => {
    const result = getRecommendations({ travel: 100, energy: 50, diet: 30 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should prioritize travel tips when travel is highest', () => {
    const result = getRecommendations({ travel: 200, energy: 50, diet: 80 });
    const primaryTips = result.filter((t) => t.isPrimary);
    expect(primaryTips.length).toBeGreaterThan(0);
    primaryTips.forEach((tip) => {
      expect(tip.category).toBe('travel');
    });
  });

  it('should prioritize energy tips when energy is highest', () => {
    const result = getRecommendations({ travel: 50, energy: 300, diet: 80 });
    const primaryTips = result.filter((t) => t.isPrimary);
    primaryTips.forEach((tip) => {
      expect(tip.category).toBe('energy');
    });
  });

  it('should prioritize diet tips when diet is highest', () => {
    const result = getRecommendations({ travel: 10, energy: 20, diet: 150 });
    const primaryTips = result.filter((t) => t.isPrimary);
    primaryTips.forEach((tip) => {
      expect(tip.category).toBe('diet');
    });
  });

  it('should include secondary and general tips', () => {
    const result = getRecommendations({ travel: 200, energy: 50, diet: 80 });
    const categories = new Set(result.map((t) => t.category));
    expect(categories.size).toBeGreaterThan(1);
    expect(categories.has('general')).toBe(true);
  });

  it('should return results for zero emissions', () => {
    const result = getRecommendations({ travel: 0, energy: 0, diet: 0 });
    expect(result.length).toBeGreaterThan(0);
  });

  it('each tip should have required fields', () => {
    const result = getRecommendations({ travel: 100, energy: 100, diet: 100 });
    result.forEach((tip) => {
      expect(tip).toHaveProperty('id');
      expect(tip).toHaveProperty('title');
      expect(tip).toHaveProperty('description');
      expect(tip).toHaveProperty('savings');
      expect(tip).toHaveProperty('category');
      expect(tip).toHaveProperty('isPrimary');
    });
  });
});

describe('getInsightSummary', () => {
  it('should return a string', () => {
    const result = getInsightSummary({ travel: 100, energy: 50, diet: 80, total: 230 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should mention zero for empty data', () => {
    const result = getInsightSummary({ travel: 0, energy: 0, diet: 0, total: 0 });
    expect(result).toContain('Enter your data');
  });

  it('should indicate below target for low emissions', () => {
    const result = getInsightSummary({ travel: 10, energy: 20, diet: 70, total: 100 });
    expect(result).toContain('below the 2050');
  });

  it('should indicate below average for moderate emissions', () => {
    const result = getInsightSummary({ travel: 50, energy: 100, diet: 100, total: 250 });
    expect(result).toContain('below the global average');
  });

  it('should warn for above-average emissions', () => {
    const result = getInsightSummary({ travel: 200, energy: 200, diet: 150, total: 550 });
    expect(result).toContain('above the global average');
  });
});
