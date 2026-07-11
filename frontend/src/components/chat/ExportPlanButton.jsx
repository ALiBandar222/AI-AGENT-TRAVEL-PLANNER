import { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import { copyPlanToClipboard, downloadPlanAsMarkdown } from "../../utils/exportPlan";

export default function ExportPlanButton({ plan, destination = "destination" }) {
  const [copied, setCopied] = useState(false);

  if (!plan) return null;

  async function handleCopy() {
    const ok = await copyPlanToClipboard(plan);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleDownload() {
    downloadPlanAsMarkdown(plan, destination);
  }

  return (
    <div className="export-plan-bar">
      <button className="export-btn" onClick={handleCopy} title="Copy plan">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <button className="export-btn" onClick={handleDownload} title="Download as Markdown">
        <Download size={14} />
        Download .md
      </button>
    </div>
  );
}
