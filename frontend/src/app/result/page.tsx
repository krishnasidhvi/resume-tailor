"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { ScoreRing } from "@/components/ScoreRing";
import { DiffView } from "@/components/DiffView";
import { SimpleMarkdown } from "@/components/SimpleMarkdown";
import { exportDocument, TailorResponse } from "@/lib/api";
import { showToast } from "@/components/Toast";

export default function ResultPage() {
  const [data, setData] = useState<TailorResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("tailor_result");
    if (!stored) {
      router.push("/");
      return;
    }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) return null;

  const handleExport = async (format: "docx" | "pdf") => {
    try {
      await exportDocument(data.resume, format);
    } catch (err: any) {
      showToast("Export Failed", err.message);
    }
  };

  const { analysis, resume } = data;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-4">
        <div>
          <h1 className="display-title mb-2">Tailoring Complete!</h1>
          <p className="body-text" style={{ color: 'var(--label-secondary)' }}>Here is your customized resume based on the job description.</p>
        </div>
        <div className="flex-shrink-0">
          <ScoreRing score={analysis.match_score} />
        </div>
      </div>

      {/* Skills Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--accent-green)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Matching Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.matching_skills.map((s, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-md surface-panel-elevated" style={{ color: 'var(--accent-green)' }}>{s}</span>
            ))}
            {analysis.matching_skills.length === 0 && <span className="caption-text italic">None identified</span>}
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--accent-purple)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Emphasized
          </h3>
          <p className="caption-text mb-2">You had these but didn't highlight them.</p>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_but_true.map((s, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-md surface-panel-elevated" style={{ color: 'var(--accent-purple)' }}>{s}</span>
            ))}
            {analysis.missing_but_true.length === 0 && <span className="caption-text italic">None</span>}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--accent-orange)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Not Supported
          </h3>
          <p className="caption-text mb-2">Intentionally omitted to keep you honest.</p>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_and_absent.map((s, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-md surface-panel-elevated" style={{ color: 'var(--accent-orange)' }}>{s}</span>
            ))}
            {analysis.missing_and_absent.length === 0 && <span className="caption-text italic">None missing</span>}
          </div>
        </GlassCard>
      </div>

      <DiffView changes={analysis.changes_summary} />

      {/* Rendered Resume */}
      <GlassCard className="relative overflow-hidden p-8 md:p-12 pb-32">
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button onClick={() => handleExport("docx")} className="btn-primary py-2 px-4 text-sm font-semibold shadow-lg">
            Download DOCX
          </button>
          <button onClick={() => handleExport("pdf")} className="btn-primary py-2 px-4 text-sm font-semibold shadow-lg">
            Download PDF
          </button>
        </div>
        
        <div className="prose prose-invert max-w-none prose-h1:text-center prose-h1:text-4xl prose-h2:border-b-2 prose-h2:border-white/20 prose-h2:pb-2">
          <SimpleMarkdown content={resume} />
        </div>
      </GlassCard>

    </div>
  );
}
