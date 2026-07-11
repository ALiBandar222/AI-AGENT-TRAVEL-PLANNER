import { AGENT_FLOW_STEPS } from "../../constants/tools";

export default function HowItWorks() {
  return (
    <section className="landing-how-it-works">
      <div className="landing-section-header">
        <h2>How the Agent Works</h2>
        <p>
          A LangGraph state machine routes your query through four nodes,
          calling real tools before synthesizing your plan.
        </p>
      </div>

      <div className="flow-steps">
        {AGENT_FLOW_STEPS.map((step, i) => (
          <div key={step.step} className="flow-step">
            <div className="flow-step-number">{step.step}</div>
            {i < AGENT_FLOW_STEPS.length - 1 && <div className="flow-step-connector" />}
            <div className="flow-step-content">
              <h3>{step.title}</h3>
              <span className="flow-step-model">{step.model}</span>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
