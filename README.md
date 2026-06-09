# 🌿 EcoTrack — Carbon Footprint Awareness Platform

> A modern, accessible web application that calculates your monthly carbon footprint from travel, energy, and diet — then provides AI-driven, personalized recommendations to reduce your environmental impact.

Built for the **Hack2Skill Challenge 3: Carbon Footprint Awareness Platform**.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chartdotjs)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Carbon Calculator** — Input travel distances (car, bike, public transport), electricity consumption (kWh or bill), and diet type
- **Dynamic Dashboard** — Real-time emission breakdown with doughnut charts, category cards, and progress bars
- **Global Comparisons** — See how your footprint compares to India, USA, EU, and 2050 target averages
- **AI Recommendations** — Smart, personalized tips sorted by your highest-emitting category
- **Fully Accessible** — WCAG AA compliant with semantic HTML, ARIA attributes, and keyboard navigation
- **Dark Theme** — Premium dark UI with emerald accents and smooth animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd carbon-footprint-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Commands

```bash
npm run build       # Production build
npm run preview     # Preview production build
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
```

---

## 🧮 Emission Calculation Formulas

### Transport Emissions (kg CO₂/month)

| Mode | Factor | Formula |
|------|--------|---------|
| Car | 0.21 kg CO₂/km | `km × 0.21` |
| Motorcycle | 0.113 kg CO₂/km | `km × 0.113` |
| Public Transport | 0.089 kg CO₂/km | `km × 0.089` |

### Energy Emissions (kg CO₂/month)

| Input Type | Formula |
|------------|---------|
| kWh directly | `kWh × 0.475` |
| Bill amount (₹) | `(₹ ÷ 8) × 0.475` |

*Factor: 0.475 kg CO₂/kWh (global weighted average)*

### Diet Emissions (kg CO₂/month)

| Diet Type | Monthly Emissions |
|-----------|-------------------|
| Meat-Heavy | 150 kg CO₂ |
| Average | 125 kg CO₂ |
| Vegetarian | 100 kg CO₂ |
| Vegan | 70 kg CO₂ |

### Total Formula
```
Total = Travel Emissions + Energy Emissions + Diet Emissions
```

### Data Sources
- [UK DEFRA Conversion Factors 2024](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting)
- [EPA Greenhouse Gas Equivalencies](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator)
- [IPCC Dietary Emissions Research](https://www.ipcc.ch/)

---

## 🏗️ Architecture

```
carbon-footprint-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Footer
│   │   ├── Calculator/      # Form, TravelSection, EnergySection, DietSection
│   │   ├── Dashboard/       # Dashboard, EmissionCard, BreakdownChart, ComparisonBar
│   │   └── Recommendations/ # AI-driven tips
│   ├── utils/
│   │   ├── calculations.js  # Pure calculation functions
│   │   └── recommendations.js # Recommendation engine
│   ├── constants/
│   │   └── emissionFactors.js # All emission factors
│   ├── hooks/
│   │   └── useCarbonCalculator.js # State management
│   ├── __tests__/            # Unit tests
│   ├── App.jsx
│   ├── App.css
│   ├── index.css             # Design system tokens
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

### Key Design Decisions

1. **Pure Calculation Functions** — All math in `calculations.js` with zero side effects for easy unit testing
2. **Custom Hook** — `useCarbonCalculator` encapsulates all state with `useMemo` for derived values
3. **No Backend** — Everything runs client-side (no API keys, no secrets, no data storage)
4. **CSS Custom Properties** — Design tokens for consistent theming without CSS frameworks

---

## ♿ Accessibility

- Semantic HTML (`<main>`, `<section>`, `<form>`, `<fieldset>`, `<legend>`)
- ARIA labels on all interactive elements
- `aria-live="polite"` on dynamic results
- `role="progressbar"` on emission bars
- Visible `:focus-visible` outlines
- High-contrast colors (WCAG AA 4.5:1 minimum)
- `prefers-reduced-motion` media query support
- Logical tab order and full keyboard operability

---

## 🔒 Security

- **No API keys** — All computation is client-side
- **No data storage** — Nothing saved to localStorage, cookies, or servers
- **No external requests** — Zero network calls at runtime
- **Input sanitization** — All numeric inputs validated (NaN, negative, Infinity handled)
- **CSP-friendly** — No inline scripts, no `eval()`
- **rel="noopener noreferrer"** on all external links

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch
```

### Test Coverage
- `calculations.test.js` — 25+ tests covering all pure functions, edge cases, and input sanitization
- `recommendations.test.js` — 12+ tests verifying category prioritization and field completeness

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
