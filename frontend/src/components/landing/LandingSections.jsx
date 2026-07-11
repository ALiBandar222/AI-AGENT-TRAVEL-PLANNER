import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { STATS_BANNER, TECH_STACK } from "../../constants/landing";

export default function StatsBanner() {
  return (
    <section className="landing-stats-banner">
      <div className="stats-banner-grid">
        {STATS_BANNER.map((s) => (
          <div key={s.label} className="stats-banner-item">
            <div className="stats-banner-value">{s.value}</div>
            <div className="stats-banner-label">{s.label}</div>
            <div className="stats-banner-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechStackSection() {
  return (
    <section className="landing-tech">
      <div className="landing-section-header">
        <h2>Built With Production-Grade Stack</h2>
        <p>Full-stack AI agent system with async backend, vector search, and streaming UI.</p>
      </div>
      <div className="tech-stack-grid">
        {TECH_STACK.map((t) => (
          <div key={t.name} className="tech-stack-item">
            <span className="tech-stack-name">{t.name}</span>
            <span className="tech-stack-role">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-brand">
        <MapPin size={18} />
        <span>Smart Travel Planner</span>
      </div>
      <p className="landing-footer-tagline">
        AI-powered travel planning with RAG, ML, live APIs, and streaming chat.
      </p>
      <div className="landing-footer-cta">
        <Link to="/signup" className="landing-cta-primary">
          Start Planning <ArrowRight size={14} />
        </Link>
      </div>
      <p className="landing-footer-copy">
        © {new Date().getFullYear()} Smart Travel Planner · Week 4 AI Engineering Bootcamp
      </p>
    </footer>
  );
}
