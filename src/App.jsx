import React from 'react';
import './index.css';
import './App.css';
import { useCarbonCalculator } from './hooks/useCarbonCalculator';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CalculatorForm from './components/Calculator/CalculatorForm';
import Dashboard from './components/Dashboard/Dashboard';
import Recommendations from './components/Recommendations/Recommendations';

/**
 * App — Root component composing the entire Carbon Footprint Platform.
 * State is managed via the useCarbonCalculator custom hook.
 */
export default function App() {
  const {
    inputs,
    updateInput,
    resetForm,
    calculate,
    emissions,
    percentages,
    recommendations,
    insightSummary,
    hasCalculated,
  } = useCarbonCalculator();

  return (
    <div className="app">
      <Header />

      <main className="app-main" id="main-content">
        {/* Hero Section */}
        <section className="hero" aria-labelledby="hero-title">
          <h2 className="hero-title" id="hero-title">
            Measure Your Impact on the Planet
          </h2>
          <p className="hero-subtitle">
            Calculate your monthly carbon footprint from travel, energy, and diet.
            Get AI-powered recommendations to reduce your environmental impact.
          </p>
        </section>

        {/* Calculator */}
        <CalculatorForm
          inputs={inputs}
          onUpdate={updateInput}
          onCalculate={calculate}
          onReset={resetForm}
        />

        {/* Dashboard & Recommendations — shown after calculation */}
        {hasCalculated && (
          <>
            <Dashboard
              emissions={emissions}
              percentages={percentages}
              insightSummary={insightSummary}
            />
            <Recommendations recommendations={recommendations} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
