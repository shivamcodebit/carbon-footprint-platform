/**
 * AI-Driven Recommendation Engine
 *
 * Generates personalized, actionable tips based on the user's
 * emission breakdown. Tips are sorted by the highest-emitting
 * category first to maximize impact.
 */

import { getHighestCategory } from './calculations';

/**
 * Recommendation database organized by category.
 * Each tip includes an estimated monthly savings potential.
 */
const RECOMMENDATION_DB = {
  travel: [
    {
      id: 'travel-1',
      title: 'Switch to Public Transport',
      description:
        'Replacing car trips with bus or metro can reduce your travel emissions by up to 75%. Even 2–3 days per week makes a significant impact.',
      savings: '50–75%',
      icon: 'Bus',
      priority: 1,
    },
    {
      id: 'travel-2',
      title: 'Try Carpooling',
      description:
        'Sharing rides with colleagues or neighbors halves your per-person emissions and saves fuel costs.',
      savings: '40–50%',
      icon: 'Users',
      priority: 2,
    },
    {
      id: 'travel-3',
      title: 'Consider an EV or Hybrid',
      description:
        'Electric vehicles produce zero tailpipe emissions. Even hybrids can cut travel emissions by 30–50%.',
      savings: '30–50%',
      icon: 'BatteryCharging',
      priority: 3,
    },
    {
      id: 'travel-4',
      title: 'Cycle for Short Trips',
      description:
        'For distances under 5 km, cycling is faster in urban areas and produces zero emissions.',
      savings: '100% on short trips',
      icon: 'Bike',
      priority: 4,
    },
    {
      id: 'travel-5',
      title: 'Work from Home',
      description:
        'Remote work even 1–2 days per week can significantly reduce your commute-related emissions.',
      savings: '20–40%',
      icon: 'Home',
      priority: 5,
    },
  ],
  energy: [
    {
      id: 'energy-1',
      title: 'Switch to LED Lighting',
      description:
        'LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer. Replace all lights for immediate savings.',
      savings: '10–15%',
      icon: 'Lightbulb',
      priority: 1,
    },
    {
      id: 'energy-2',
      title: 'Use a Smart Thermostat',
      description:
        'Smart thermostats learn your schedule and optimize heating/cooling, reducing energy use by up to 15%.',
      savings: '10–15%',
      icon: 'Thermometer',
      priority: 2,
    },
    {
      id: 'energy-3',
      title: 'Adopt Solar Energy',
      description:
        'Rooftop solar panels can offset 50–100% of your electricity emissions. Government subsidies make it affordable.',
      savings: '50–100%',
      icon: 'Sun',
      priority: 3,
    },
    {
      id: 'energy-4',
      title: 'Unplug Standby Devices',
      description:
        'Phantom loads from electronics on standby account for 5–10% of household electricity. Use smart power strips.',
      savings: '5–10%',
      icon: 'PlugZap',
      priority: 4,
    },
    {
      id: 'energy-5',
      title: 'Upgrade to 5-Star Appliances',
      description:
        'Energy-efficient appliances (5-star BEE rated) consume 30–50% less electricity than older models.',
      savings: '20–30%',
      icon: 'Star',
      priority: 5,
    },
  ],
  diet: [
    {
      id: 'diet-1',
      title: 'Adopt Meatless Mondays',
      description:
        'Skipping meat one day per week can reduce your diet-related emissions by ~15%. Start small, build a habit.',
      savings: '10–15%',
      icon: 'Salad',
      priority: 1,
    },
    {
      id: 'diet-2',
      title: 'Reduce Red Meat Intake',
      description:
        'Beef produces 10x more emissions than chicken. Swapping beef for poultry or fish cuts emissions significantly.',
      savings: '25–35%',
      icon: 'LeafyGreen',
      priority: 2,
    },
    {
      id: 'diet-3',
      title: 'Choose Local & Seasonal',
      description:
        'Locally grown seasonal produce requires less transportation and cold storage, cutting food-miles emissions.',
      savings: '5–10%',
      icon: 'MapPin',
      priority: 3,
    },
    {
      id: 'diet-4',
      title: 'Minimize Food Waste',
      description:
        'Plan meals, store food properly, and compost scraps. Food waste in landfills produces methane — a potent greenhouse gas.',
      savings: '5–15%',
      icon: 'Trash2',
      priority: 4,
    },
    {
      id: 'diet-5',
      title: 'Explore Plant-Based Proteins',
      description:
        'Lentils, chickpeas, and tofu provide excellent protein with a fraction of the carbon footprint of animal products.',
      savings: '30–50%',
      icon: 'Sprout',
      priority: 5,
    },
  ],
};

/**
 * General tips shown regardless of category.
 */
const GENERAL_TIPS = [
  {
    id: 'general-1',
    title: 'Track Your Progress',
    description:
      'Regularly recalculating your footprint helps you see the impact of changes and stay motivated.',
    savings: 'Awareness',
    icon: 'TrendingDown',
    priority: 10,
  },
  {
    id: 'general-2',
    title: 'Offset Remaining Emissions',
    description:
      'After reducing what you can, consider verified carbon offset programs for tree planting or renewable energy projects.',
    savings: 'Variable',
    icon: 'TreePine',
    priority: 11,
  },
];

/**
 * Generate personalized recommendations based on emission breakdown.
 *
 * Strategy:
 * 1. Identify the highest-emitting category.
 * 2. Return all tips for that category (highest impact first).
 * 3. Add top tips from other categories.
 * 4. Append general tips.
 *
 * @param {{ travel: number, energy: number, diet: number }} breakdown
 * @returns {Array<Object>} — sorted recommendations
 */
export function getRecommendations(breakdown) {
  const highest = getHighestCategory(breakdown);

  const categories = ['travel', 'energy', 'diet'];
  const otherCategories = categories.filter((c) => c !== highest);

  const primaryTips = RECOMMENDATION_DB[highest].slice(0, 3).map((tip) => ({
    ...tip,
    category: highest,
    isPrimary: true,
  }));

  const secondaryTips = otherCategories.flatMap((cat) =>
    RECOMMENDATION_DB[cat].slice(0, 2).map((tip) => ({
      ...tip,
      category: cat,
      isPrimary: false,
    }))
  );

  const generalTips = GENERAL_TIPS.map((tip) => ({
    ...tip,
    category: 'general',
    isPrimary: false,
  }));

  return [...primaryTips, ...secondaryTips, ...generalTips];
}

/**
 * Get a summary insight string about the user's footprint.
 *
 * @param {{ travel: number, energy: number, diet: number, total: number }} emissions
 * @returns {string}
 */
export function getInsightSummary(emissions) {
  const { total } = emissions;
  const highest = getHighestCategory(emissions);

  const categoryLabels = { travel: 'Travel', energy: 'Energy', diet: 'Diet' };
  const label = categoryLabels[highest];

  if (total === 0) {
    return 'Enter your data above to see your carbon footprint analysis.';
  }

  if (total < 167) {
    return `Great job! Your footprint of ${total} kg CO₂/month is below the 2050 sustainability target. ${label} is your largest area — small tweaks can help maintain this.`;
  }

  if (total < 375) {
    return `Your footprint of ${total} kg CO₂/month is below the global average. ${label} is your biggest contributor — focus there for the most impact.`;
  }

  return `Your footprint of ${total} kg CO₂/month is above the global average. ${label} accounts for the most emissions — the tips below can help you reduce it significantly.`;
}
