import { AGENT_TOOLS } from "../../constants/tools";

export default function ToolsShowcase() {
  return (
    <section className="landing-tools">
      <div className="landing-section-header">
        <h2>5 Real Data Tools</h2>
        <p>
          The agent doesn&apos;t guess — it calls validated, allowlisted tools
          in parallel and streams results to your chat in real time.
        </p>
      </div>

      <div className="tools-grid">
        {AGENT_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div key={tool.id} className="tool-card">
              <div className="tool-card-icon" style={{ color: tool.color }}>
                <Icon size={28} />
              </div>
              <h3>{tool.name}</h3>
              <p className="tool-card-desc">{tool.description}</p>
              <div className="tool-card-meta">
                <div className="tool-card-when">
                  <strong>When:</strong> {tool.when}
                </div>
                <div className="tool-card-source">
                  <strong>Source:</strong> {tool.dataSource}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
