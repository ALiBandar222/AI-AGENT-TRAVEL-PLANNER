import {
  Database,
  Brain,
  CloudSun,
  Plane,
  DollarSign,
} from "lucide-react";

export const AGENT_TOOLS = [
  {
    id: "rag_retriever",
    name: "RAG Retriever",
    icon: Database,
    color: "#0369a1",
    description:
      "Searches 19 destination knowledge documents using pgvector semantic similarity to find the best travel matches.",
    when: "User mentions a destination or asks for travel recommendations",
    dataSource: "PostgreSQL + pgvector (HNSW index)",
  },
  {
    id: "ml_predictor",
    name: "ML Predictor",
    icon: Brain,
    color: "#7c3aed",
    description:
      "RandomForest model predicts travel style (budget, luxury, adventure, etc.) from 8 preference scores.",
    when: "User describes their travel preferences or style",
    dataSource: "scikit-learn artifact (joblib)",
  },
  {
    id: "weather_fetcher",
    name: "Weather Fetcher",
    icon: CloudSun,
    color: "#f59e0b",
    description:
      "Fetches live weather conditions for the destination using latitude/longitude from RAG results.",
    when: "Planning trips or user asks about weather",
    dataSource: "wttr.in API",
  },
  {
    id: "flight_searcher",
    name: "Flight Searcher",
    icon: Plane,
    color: "#0891b2",
    description:
      "Searches flight options between origin and destination cities via DuckDuckGo snippets.",
    when: "User needs flight information or price estimates",
    dataSource: "DuckDuckGo search API",
  },
  {
    id: "fx_checker",
    name: "FX Checker",
    icon: DollarSign,
    color: "#16a34a",
    description:
      "Returns live exchange rates between two currencies for accurate budget planning.",
    when: "User asks about currency conversion or travel budget",
    dataSource: "frankfurter.app (ECB rates)",
  },
];

export const AGENT_FLOW_STEPS = [
  {
    step: 1,
    title: "Classify Intent",
    model: "Cheap LLM",
    description: "Determines if the message is casual chat or a real travel request.",
  },
  {
    step: 2,
    title: "Check Context",
    model: "Cheap LLM + Embedder",
    description: "Extracts destination via RAG, identifies origin country, asks for missing info.",
  },
  {
    step: 3,
    title: "Run Tools",
    model: "Cheap LLM + 5 Tools",
    description: "Selects and executes tools in parallel — RAG, ML, weather, flights, FX.",
  },
  {
    step: 4,
    title: "Synthesize Plan",
    model: "Strong LLM",
    description: "Combines all tool outputs into a personalized, streamed travel plan.",
  },
];
