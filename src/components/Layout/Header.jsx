import React from 'react';
import { Leaf } from 'lucide-react';

/**
 * Header — Sticky navigation bar with brand identity.
 * Uses semantic <header> and <nav> elements for accessibility.
 */
export default function Header() {
  return (
    <header className="header" role="banner">
      <nav className="header-inner" aria-label="Main navigation">
        <a href="/" className="header-brand" aria-label="EcoTrack home">
          <div className="header-logo" aria-hidden="true">
            <Leaf size={18} />
          </div>
          <h1 className="header-title">
            Eco<span>Track</span>
          </h1>
        </a>
        <span className="header-badge" aria-label="Beta version">Beta</span>
      </nav>
    </header>
  );
}
