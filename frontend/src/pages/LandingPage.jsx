import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { getToken } from "../api";
import { FEATURES, BG_ITEMS } from "../constants/landing";
import DestinationGrid from "../components/landing/DestinationGrid";
import HowItWorks from "../components/landing/HowItWorks";
import ToolsShowcase from "../components/landing/ToolsShowcase";
import StatsBanner, { TechStackSection, LandingFooter } from "../components/landing/LandingSections";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-brand">
          <MapPin size={22} />
          <span>Smart Travel Planner</span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="landing-nav-link">Sign In</Link>
          <Link to="/signup" className="landing-nav-link landing-nav-link--primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-bg" aria-hidden="true">
          {BG_ITEMS.map(({ icon: Icon, size, color, style, cls, delay, dur }, i) => (
            <div
              key={i}
              className={`lbg-item ${cls}`}
              style={{ ...style, color, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
            >
              <Icon size={size} />
            </div>
          ))}
        </div>

        <h1 className="landing-headline">
          Plan your next adventure
          <br />
          <span className="landing-accent">with AI</span>
        </h1>
        <p className="landing-sub">
          Flights, weather, currency, ML style prediction, and personalised
          itineraries — all in one streaming conversation.
        </p>
        <div className="landing-cta-group">
          <Link to="/signup" className="landing-cta-primary">
            Get Started <ArrowRight size={16} />
          </Link>
          <Link to="/login" className="landing-cta-secondary">Sign In</Link>
        </div>
      </section>

      <StatsBanner />

      <section className="landing-features">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="landing-feature-card">
            <div className="landing-feature-icon"><Icon size={28} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      <HowItWorks />
      <ToolsShowcase />
      <DestinationGrid />
      <TechStackSection />
      <LandingFooter />
    </div>
  );
}
