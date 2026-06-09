import React from 'react';
import {
  Lightbulb, Bus, Users, BatteryCharging, Bike, Home,
  Zap, Thermometer, Sun, PlugZap, Star,
  MapPin, Trash2, Sprout, TrendingDown, TreePine,
} from 'lucide-react';

/** Map icon names from recommendation data to Lucide components */
const ICON_MAP = {
  Bus, Users, BatteryCharging, Bike, Home,
  Lightbulb, Thermometer, Sun, PlugZap, Star,
  Salad: Sprout, LeafyGreen: Sprout, MapPin, Trash2, Sprout,
  TrendingDown, TreePine,
};

/**
 * Recommendations — Displays personalized, AI-driven tips
 * sorted by highest impact category.
 */
export default function Recommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section
      className="recommendations"
      aria-labelledby="recommendations-heading"
    >
      <div className="section-header">
        <div className="section-icon tips" aria-hidden="true">
          <Lightbulb size={20} />
        </div>
        <div>
          <h2 className="section-title" id="recommendations-heading">
            Smart Recommendations
          </h2>
          <p className="section-description">
            Personalized tips to reduce your carbon footprint
          </p>
        </div>
      </div>

      <div className="recommendations-grid" role="list">
        {recommendations.map((tip) => {
          const IconComponent = ICON_MAP[tip.icon] || Lightbulb;

          return (
            <article
              key={tip.id}
              className={`tip-card ${tip.isPrimary ? 'primary' : ''}`}
              role="listitem"
            >
              <div className="tip-card-header">
                <div className={`tip-card-icon ${tip.category}`} aria-hidden="true">
                  <IconComponent size={18} />
                </div>
                <h3 className="tip-card-title">{tip.title}</h3>
              </div>
              <p className="tip-card-desc">{tip.description}</p>
              <div className="tip-card-footer">
                <span className="tip-card-savings" aria-label={`Potential savings: ${tip.savings}`}>
                  ↓ {tip.savings}
                </span>
                <span className="tip-card-category">{tip.category}</span>
                {tip.isPrimary && (
                  <span className="tip-card-badge">★ Top Priority</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
