import { Sparkles, MessageSquare, Wand2 } from "lucide-react";
import { SUGGESTED_PROMPTS, QUICK_ACTIONS } from "../../constants/prompts";

export default function ChatWelcome({ onSelectPrompt }) {
  return (
    <div className="chat-welcome">
      <div className="chat-welcome-header">
        <Sparkles size={32} className="chat-welcome-icon" />
        <h2>Where would you like to go?</h2>
        <p>
          I&apos;ll search destinations, check weather, find flights,
          convert currency, and build a personalized plan — all in one chat.
        </p>
      </div>

      <div className="chat-welcome-section">
        <h3><MessageSquare size={16} /> Try asking</h3>
        <div className="prompt-grid">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p.id}
              className="prompt-card"
              onClick={() => onSelectPrompt(p.text)}
            >
              <span className="prompt-label">{p.label}</span>
              <span className="prompt-text">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-welcome-section">
        <h3><Wand2 size={16} /> Customize any trip</h3>
        <div className="quick-actions">
          {QUICK_ACTIONS.map((a) => (
            <span key={a.label} className="quick-action-chip">
              {a.label}
            </span>
          ))}
        </div>
        <p className="chat-welcome-hint">
          Add these to your request, e.g. &quot;Plan a trip to Bali on a tight budget&quot;
        </p>
      </div>
    </div>
  );
}
