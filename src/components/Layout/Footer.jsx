import React from 'react';

/**
 * Footer — Attribution and formula source references.
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer-text">
        Built for the Hack2Skill Carbon Footprint Challenge &middot;{' '}
        Emission factors sourced from{' '}
        <a
          href="https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting"
          target="_blank"
          rel="noopener noreferrer"
        >
          UK DEFRA
        </a>{' '}
        &amp;{' '}
        <a
          href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          EPA
        </a>
        <br />
        &copy; {new Date().getFullYear()} EcoTrack. All calculations are estimates for awareness purposes.
      </p>
    </footer>
  );
}
